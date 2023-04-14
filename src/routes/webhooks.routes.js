const express = require('express');

const router = express.Router();
const controller = require('../controllers/webhook.controller');
const { validateFormOwner, validateWebhookOwner, hasWebhookPermission } = require('../middlewares/validateModel');
const loginRequired = require('../middlewares/loginRequired');
const validateReqBody = require('../middlewares/validateReqBody');
const validators = require('../utils/validators');

router.post('/:id', loginRequired, hasWebhookPermission, validateFormOwner, validateReqBody(validators.webhook), controller.createWebhook);
router.get('/:id/:webhookId', loginRequired, hasWebhookPermission, validateFormOwner, validateWebhookOwner, controller.getWebhook);
router.put('/:id/:webhookId', loginRequired, hasWebhookPermission, validateFormOwner, validateWebhookOwner, validateReqBody(validators.webhook), controller.updateWebhook);
router.delete('/:id/:webhookId', loginRequired, hasWebhookPermission, validateFormOwner, validateWebhookOwner, controller.deleteWebhook);

module.exports = router;
