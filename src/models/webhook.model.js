const mongoose = require('mongoose');

const Webhook = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  authUsername: {
    type: String,
    default: '',
  },
  authPassword: {
    type: String,
    default: '',
  },
  headers: [{
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }],
  staticKeys: [{
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }],
  isEnabled: {
    type: Boolean,
    default: false,
  },
  form: {
    type: mongoose.ObjectId,
    ref: 'Form',
    required: true,
  },
});

module.exports = mongoose.model('Webhook', Webhook);
