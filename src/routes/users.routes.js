const userController = require('../controllers/user.controller');
const validationMiddleware = require('./../middleware/validation.middleware');
const express = require('express');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation, // this routes are on middleware
  userController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation, // this routes are on middleware
  userController.login
);

module.exports = router;
