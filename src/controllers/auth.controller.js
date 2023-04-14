const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user.model');
const Plan = require('../models/plan.model.js');
const sendMail = require('../utils/sendMail');

module.exports = {
  async register(req, res) {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json({ error: 'User with email already exists' });
    }

    const customer = await stripe.customers.create({ email: req.body.email });
    const freePlan = await Plan.findOne({ name: 'free' });
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      email: req.body.email,
      password: encryptedPassword,
      stripeCustomerId: customer.id,
      plan: freePlan._id,
      apiKey: crypto.randomUUID(),
    });

    return res.json({ msg: 'success' });
  },

  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      return res.json({ token });
    }
    return res.status(400).json({ error: 'Invalid Email/Password' });
  },

  async resetPassword(req, res) {
    const exists = await User.findOne({ email: req.body.email });
    if (!exists) {
      return res.status(401).json({ error: 'User with this email not found' });
    }

    const token = jwt.sign({
      email: req.body.email,
    }, process.env.JWT_PASSWORD_SECRET_KEY, { expiresIn: 900 });
    const url = `${process.env.FRONTEND_URL}reset-password/perform`;

    const subject = 'Reset Password';
    const body = `Password reset url: ${url}?token=${token}`;
    sendMail(req.body.email, subject, body);

    return res.json({ msg: 'success' });
  },

  async performResetPassword(req, res) {
    try {
      const email = jwt.verify(req.body.token, process.env.JWT_PASSWORD_SECRET_KEY);

      const user = await User.findOne({ email: email.email });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const encryptedPassword = await bcrypt.hash(req.body.password1, 10);
      await User.findByIdAndUpdate(user._id, { password: encryptedPassword });

      return res.json({ msg: 'success' });
    } catch (err) {
      return res.status(401).json({ error: 'Token is either invalid or expired' });
    }
  },
};
