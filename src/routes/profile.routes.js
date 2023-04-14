const express = require('express');
const controller = require('../controllers/profile.controller');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.get('/', loginRequired, controller.getProfileDetails);
router.post('/refresh-api-key', loginRequired, controller.refreshApiKey);
router.post('/change-password', loginRequired, controller.changePassword);

module.exports = router;
