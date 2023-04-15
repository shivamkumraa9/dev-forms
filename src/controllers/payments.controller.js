const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Plan = require('../models/plan.model.js');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

// eslint-disable-next-line consistent-return
async function webhookManager(subscription, shouldUpdate = true, transactionStatus = '', amount = 0) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (!user) return;

  const plan = await Plan.findOne({ stripePriceId: subscription.plan.id });
  if (shouldUpdate) {
    await User.findByIdAndUpdate(user._id, {
      stripeSubscriptionId: subscription.id,
      nextPaymentDate: Math.floor(subscription.current_period_end * 1000),
      subscriptionStatus: subscription.status,
      isCancelled: subscription.cancel_at_period_end,
      plan: plan._id,
    });
  }

  if (transactionStatus) {
    await Transaction.create({
      user: user._id,
      plan: plan.name,
      status: transactionStatus,
      amount: amount / 100,
    });
  }
}

module.exports = {
  async subscribe(req, res) {
    if (req.user.stripeSubscriptionId) return res.status(400).json({ error: 'Invalid Req' });

    const plan = await Plan.findOne({ name: req.params.planName });
    if (!plan || !plan.price) return res.status(400).json({ error: 'Invalid Plan' });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      customer: req.user.stripeCustomerId,
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}forms`,
      cancel_url: 'https://google.com',
    });

    return res.json({ url: session.url });
  },

  async toogleSubscription(req, res) {
    if (!req.user.stripeSubscriptionId) return res.status(400).json({ error: 'Invalid Req' });

    await stripe.subscriptions.update(
      req.user.stripeSubscriptionId,
      { cancel_at_period_end: !req.user.isCancelled },
    );
    return res.json({ url: 'success' });
  },

  async changePlan(req, res) {
    if (!req.user.stripeSubscriptionId) return res.status(400).json({ error: 'Invalid Req' });

    const plan = await Plan.findOne({ name: req.params.planName });
    if (!plan || !plan.price || req.user.plan.equals(plan._id)) return res.status(400).json({ error: 'Invalid Plan' });

    const subscription = await stripe.subscriptions.retrieve(req.user.stripeSubscriptionId);
    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
      proration_behavior: 'always_invoice',
      items: [{
        id: subscription.items.data[0].id,
        price: plan.stripePriceId,
      }],
    });

    return res.json({ msg: 'success' });
  },

  async handleWebhook(req, res) {
    // stripe listen --forward-to localhost:5000/payments/webhook

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, req.headers['stripe-signature'], process.env.WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).json({ msg: `Webhook Error: ${err.message}` });
    }

    const session = event.data.object;

    if (event.type === 'invoice.payment_succeeded') {
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await webhookManager(subscription, true, 'success', session.total);
      }
    } else if (event.type === 'invoice.payment_failed') {
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await webhookManager(subscription, false, 'failed', session.total);
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const user = await User.findOne({ stripeCustomerId: session.customer });
      const freePlan = await Plan.findOne({ name: 'free' });

      await User.findByIdAndUpdate(user._id, {
        stripeSubscriptionId: '',
        subscriptionStatus: '',
        isCancelled: false,
        plan: freePlan._id,
      });
    } else if (event.type === 'customer.subscription.updated') {
      await webhookManager(session);
    }

    return res.json({ msg: 'success' });
  },
};
