const joi = require('joi');
const Form = require('../models/form.model');
const Submission = require('../models/submission.model');
const Plan = require('../models/plan.model.js');
const Webhook = require('../models/webhook.model');
const sendMail = require('../utils/sendMail');
const triggerWebhook = require('../utils/triggerWebhooks');

module.exports = {
  async getForms(req, res) {
    const forms = await Form.find({ user: req.user._id });
    const formsJson = JSON.parse(JSON.stringify(forms));

    const counts = await Submission.aggregate([
      { $match: { form: { $in: forms.map((form) => form._id) } } },
      { $group: { _id: '$form', count: { $sum: 1 } } },
    ]);

    for (let i = 0; i < formsJson.length; i += 1) {
      formsJson[i].totalSubmissions = 0;
      for (let j = 0; j < counts.length; j += 1) {
        if (counts[j]._id.equals(formsJson[i]._id)) {
          formsJson[i].totalSubmissions = counts[j].count;
          break;
        }
      }
    }
    return res.json(formsJson);
  },

  async createForm(req, res) {
    const plan = await Plan.findById(req.user.plan);

    const form = await Form.create({
      user: req.user._id,
      name: req.body.name,
      description: req.body.description,
      successRedirect: req.body.successRedirect,
      sendEmailNotifications: plan.allowEmailNotifications,
    });
    return res.json(form);
  },

  async getForm(req, res) {
    const plan = await Plan.findById(req.user.plan, { stripePriceId: 0 });

    let webhooks = [];
    const submissions = await Submission.find({ form: req.form._id });

    if (plan.allowWebhookIntegration) {
      webhooks = await Webhook.find({ form: req.form._id });
    }
    return res.json({
      plan, webhooks, submissions, form: req.form,
    });
  },

  async updateForm(req, res) {
    const plan = await Plan.findById(req.user.plan);
    const { allowEmailNotifications } = plan;

    await Form.findByIdAndUpdate(req.form._id, {
      name: req.body.name,
      description: req.body.description,
      successRedirect: req.body.successRedirect,
      allowNewSubmissions: req.body.allowNewSubmissions,
      sendEmailNotifications: allowEmailNotifications ? req.body.sendEmailNotifications : false,
    });

    return res.json({ msg: 'success' });
  },

  async submit(req, res) {
    const objError = joi.string().hex().length(24).validate(req.params.id);
    if (objError.error) return res.status(400).json({ error: 'Invalid Id' });

    const form = await Form.findOne({
      _id: req.params.id,
    }).populate('user');

    if (!form) return res.status(404).json({ error: 'Form not found' });
    if (!form.allowNewSubmissions) return res.status(400).json({ error: 'Form is no longer accepting new submission' });

    const plan = await Plan.findById(form.user.plan);
    const monthlyLimit = plan.monthlySubmissionsLimit;

    const startOfMonth = new Date();
    startOfMonth.setDate(1); startOfMonth.setUTCHours(0, 0, 0, 0);

    const submissionsThisMonth = await Submission.find({
      form: form._id,
      createdAt: {
        $gte: startOfMonth,
      },
    }).count();
    if (submissionsThisMonth >= monthlyLimit) return res.status(400).json({ error: 'Monthly limit reached' });

    const submission = await Submission.create({
      form: form._id,
      data: req.body,
    });

    if (plan.allowEmailNotifications && form.sendEmailNotifications) {
      sendMail(form.user.email, 'New Submission Recieved', JSON.stringify(submission));
    }

    if (plan.allowWebhookIntegration) {
      const webhooks = await Webhook.find({ form: form._id, isEnabled: true });
      triggerWebhook(webhooks, submission.data);
    }

    if (form.successRedirectUrl) {
      return res.redirect(form.successRedirectUrl);
    }
    return res.json(submission);
  },

  async getFormSubmissions(req, res) {
    return res.json(await Submission.find({ form: req.form._id }));
  },

  async deleteForm(req, res) {
    await Webhook.deleteMany({ form: req.form._id });
    await Submission.deleteMany({ form: req.form._id });
    await Form.deleteOne({ _id: req.form._id });
    return res.json({ msg: 'success' });
  },

  async deleteSubmission(req, res) {
    const submission = await Submission.findById(req.params.id).populate('form');

    if (submission && submission.form && req.user._id.equals(submission.form.user)) {
      await Submission.deleteOne({ _id: submission._id });
      return res.json({ msg: 'success' });
    }
    return res.status(404).json({ msg: 'not found' });
  },
};
