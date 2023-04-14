const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controller');
const validateReqBody = require('../middlewares/validateReqBody');
const validators = require('../utils/validators');

router.post('/register', validateReqBody(validators.register), controller.register);
router.post('/login', validateReqBody(validators.login), controller.login);
router.post('/reset-password', validateReqBody(validators.email), controller.resetPassword);
router.post('/reset-password/perform', validateReqBody(validators.performPasswordReset), controller.performResetPassword);

module.exports = router;
