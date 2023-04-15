const express = require('express');

const router = express.Router();
const controller = require('../controllers/webhook.controller');
const { validateFormOwner, validateWebhookOwner, hasWebhookPermission } = require('../middlewares/validateModel');
const loginRequired = require('../middlewares/loginRequired');
const validateReqBody = require('../middlewares/validateReqBody');
const validators = require('../utils/validators');

router.post('/:id', loginRequired, hasWebhookPermission, validateFormOwner, validateReqBody(validators.webhook), controller.createWebhook);
router.get('/:id/', loginRequired, hasWebhookPermission, validateWebhookOwner, controller.getWebhook);
router.post('/update/:id/', loginRequired, hasWebhookPermission, validateWebhookOwner, validateReqBody(validators.webhook), controller.updateWebhook);
router.delete('/:id/', loginRequired, hasWebhookPermission, validateWebhookOwner, controller.deleteWebhook);

module.exports = router;
