const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  plan: {
    type: mongoose.ObjectId,
    ref: 'Plan',
    required: true,
  },
  stripeCustomerId: {
    type: String,
    required: true,
  },
  stripeSubscriptionId: String,
  subscriptionStatus: String,
  nextPaymentDate: Date,
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', User);
