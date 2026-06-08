const express = require('express');
const { login } = require('../controllers/auth.controller');
const { loginRules } = require('../validators/auth.validator');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const { asyncHandler } = require('../middleware/async.middleware');

const router = express.Router();

router.post('/login', loginRules, handleValidationErrors, asyncHandler(login));

module.exports = router;
