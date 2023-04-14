const express = require('express');

const router = express.Router();
const controller = require('../controllers/form.controller');
const validateReqBody = require('../middlewares/validateReqBody');
const validators = require('../utils/validators');
const loginRequired = require('../middlewares/loginRequired');
const { validateFormOwner } = require('../middlewares/validateModel');

router.get('/', loginRequired, controller.getForms);
router.post('/', validateReqBody(validators.addForm), loginRequired, controller.createForm);
router.get('/:id', loginRequired, validateFormOwner, controller.getForm);
router.put('/:id', loginRequired, validateFormOwner, validateReqBody(validators.updateForm), controller.updateForm);
router.post('/:id/submit', controller.submit);
router.get('/:id/submissions', loginRequired, validateFormOwner, controller.getFormSubmissions);
router.delete('/:id', loginRequired, validateFormOwner, controller.deleteForm);
router.delete('/submissions/:id', loginRequired, controller.deleteSubmission);

module.exports = router;
