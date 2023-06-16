const validationMiddleware = require('../middleware/validation.middleware');
const express = require('express');
const transfersController = require('../controllers/transfers.controller');
const router = express.Router();


router.post(
  '/',
  validationMiddleware.transferUserValidation,
  transfersController.transfer
);


  module.exports = router;