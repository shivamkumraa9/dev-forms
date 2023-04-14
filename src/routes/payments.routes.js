const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const controller = require('../controllers/payments.controller');

const router = express.Router();

router.post('/subscribe/:planName', loginRequired, controller.subscribe);
router.post('/toogle-subscription', loginRequired, controller.toogleSubscription);
router.post('/change-plan/:planName', loginRequired, controller.changePlan);
router.post('/webhook', controller.handleWebhook);

module.exports = router;
