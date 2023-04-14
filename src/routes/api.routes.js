const express = require('express');

const router = express.Router();
const controller = require('../controllers/form.controller');
const { validateFormOwner } = require('../middlewares/validateModel');
const validateApiKey = require('../middlewares/validateApiKey');

router.get('/forms', validateApiKey, controller.getForms);
router.get('/forms/:id/submissions', validateApiKey, validateFormOwner, controller.getFormSubmissions);

module.exports = router;
