const joi = require('joi');
const Form = require('../models/form.model');
const Webhook = require('../models/webhook.model');
const Plan = require('../models/plan.model.js');

async function doesModelExists(model, id) {
  const objError = joi.string().hex().length(24).validate(id);
  if (objError.error) return false;

  const data = await model.findById(id);
  if (!data) return false;
  return data;
}

module.exports = {
  async validateFormOwner(req, res, next) {
    const form = await doesModelExists(Form, req.params.id);
    if (!form) return res.status(404).json({ msg: 'Form not found' });
    if (!req.user._id.equals(form.user)) return res.status(401).json({ msg: 'You cannot access this form' });
    req.form = form;
    return next();
  },

  async validateWebhookOwner(req, res, next) {
    const webhook = await doesModelExists(Webhook, req.params.id);
    if (!webhook) return res.status(404).json({ msg: 'Webhook not found' });

    const form = await Form.findById(webhook.form);
    if (!form || !req.user._id.equals(form.user)) return res.status(401).json({ msg: 'You cannot access this webhook' });

    req.webhook = webhook;
    return next();
  },

  async hasWebhookPermission(req, res, next) {
    const userPlan = await Plan.findById(req.user.plan);
    if (!userPlan.allowWebhookIntegration) return res.status(401).json({ msg: 'Your plan does not support webhooks' });

    return next();
  },
};
