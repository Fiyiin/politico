import { check } from 'express-validator/check';

const validation = {
  checkAddUser: [
    check('firstname').isLength({ min: 1 }).withMessage('Firstname cannot be empty'),
    check('lastname').isLength({ min: 1 }).withMessage('Lastname cannot be empty'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    check('phone_number').isLength({ min: 5 }).withMessage('Phone number cannot be empty'),
    check('is_admin').isBoolean().withMessage('Admin must either be true or false'),
  ],
};

export default validation;
