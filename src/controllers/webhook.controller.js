const Webhook = require('../models/webhook.model');

module.exports = {
  getWebhook(req, res) {
    return res.json(req.webhook);
  },

  async createWebhook(req, res) {
    const webhook = await Webhook.create({
      ...req.body,
      form: req.form._id,
    });
    return res.json(webhook);
  },

  async updateWebhook(req, res) {
    await Webhook.findByIdAndUpdate(req.webhook._id, {
      ...req.body,
    });
    return res.json({ msg: 'success' });
  },

  async deleteWebhook(req, res) {
    await Webhook.deleteOne({ _id: req.webhook._id });
    return res.json({ msg: 'success' });
  },
};
