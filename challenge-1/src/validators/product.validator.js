const { body } = require('express-validator');

const productRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required'),

  body('category')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('category must be a string'),

  body('price')
    .isFloat({ gt: 0 })
    .withMessage('price must be a positive number'),

  body('quantity')
    .isInt({ min: 0 })
    .withMessage('quantity must be a non-negative integer'),
];

module.exports = { productRules };
