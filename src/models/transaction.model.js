const mongoose = require('mongoose');

const Transaction = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Transaction', Transaction);
