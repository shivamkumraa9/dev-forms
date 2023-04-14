const mongoose = require('mongoose');

const Plan = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stripePriceId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  monthlySubmissionsLimit: {
    type: Number,
    required: true,
  },
  allowEmailNotifications: {
    type: Boolean,
    required: true,
  },
  allowApiAccess: {
    type: Boolean,
    required: true,
  },
  allowWebhookIntegration: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Plan', Plan);
