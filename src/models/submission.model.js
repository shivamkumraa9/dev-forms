const mongoose = require('mongoose');

const Submission = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  form: {
    type: mongoose.ObjectId,
    ref: 'Form',
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('Submission', Submission);
