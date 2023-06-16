const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

// Register validation
exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty!🫢'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!🫢')
    .isLength({ min: 8 }) //. 8 digits minimun
    .withMessage('Password must be at least 6 characters long!😬'),
  validateFields,
];

// Login validation
exports.loginUserValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('Account number cannot be empty! 🫢')
    .isNumeric()
    .withMessage('Account number must be a valid number!😬'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!🫢')
    .isLength({ min: 8 }) //. 8 digits minimun
    .withMessage('Password must be at least 6 characters long!😬'),
  validateFields,
];
