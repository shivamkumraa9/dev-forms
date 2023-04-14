const joi = require('joi');

module.exports = {
  register: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    password1: joi.string().equal(joi.ref('password')).required(),
  }),

  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),

  email: joi.object({
    email: joi.string().email().required(),
  }),

  performPasswordReset: joi.object({
    token: joi.string().min(1).required(),
    password: joi.string().min(6).required(),
    password1: joi.string().equal(joi.ref('password')).required(),
  }),

  changePassword: joi.object({
    oldPassword: joi.string().min(6).required(),
    password: joi.string().min(6).required(),
    password1: joi.string().equal(joi.ref('password')).required(),
  }),

  addForm: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    successRedirect: joi.string().uri().allow(''),
  }),

  updateForm: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    successRedirect: joi.string().uri().allow(''),
    allowNewSubmissions: joi.boolean().required(),
    sendEmailNotifications: joi.boolean().required(),
  }),

  webhook: joi.object({
    name: joi.string().required(),
    url: joi.string().uri().required(),
    authUsername: joi.string().allow(''),
    authPassword: joi.string().allow(''),
    headers: joi.array().items({
      key: joi.string().required(),
      value: joi.string().required(),
    }),
    staticKeys: joi.array().items({
      key: joi.string().required(),
      value: joi.string().required(),
    }),
    isEnabled: joi.boolean().required(),
  }),
};
