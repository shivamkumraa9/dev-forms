const mongoose = require('mongoose');

const Form = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  successRedirectUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  allowNewSubmissions: {
    type: Boolean,
    default: true,
  },
  sendEmailNotifications: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Form', Form);
