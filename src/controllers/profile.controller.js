const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user.model');
const Plan = require('../models/plan.model.js');
const Transaction = require('../models/transaction.model');

module.exports = {
  async getProfileDetails(req, res) {
    const details = {
      email: req.user.email,
      apiKey: req.user.apiKey,
      subscriptionStatus: req.user.subscriptionStatus,
      nextPaymentDate: req.user.nextPaymentDate,
      isCancelled: req.user.isCancelled,
    };
    details.plan = await Plan.findById(req.user.plan, { stripePriceId: 0 });
    details.paymentHistory = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(details);
  },

  async refreshApiKey(req, res) {
    const apiKey = crypto.randomUUID();
    await User.findByIdAndUpdate(req.user._id, { apiKey });
    return res.json({ apiKey });
  },

  async changePassword(req, res) {
    if (!(await bcrypt.compare(req.body.oldPassword, req.user.password))) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(req.user._id, { password: encryptedPassword });
    return res.json({ msg: 'success' });
  },
};
