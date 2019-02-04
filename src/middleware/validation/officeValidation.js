import { check } from 'express-validator/check';

const checkOfficeId = [check('id').matches(/^\d+$/).withMessage('Office Id must be a number')];
const checkUserById = [check('id').matches(/^\d+$/).withMessage('User Id must be a number')];

const validation = {
  checkAddOffice: [
    check('name').isLength({ min: 1 }).withMessage('Office name cannot be empty'),
    check('type').isIn(['federal', 'state', 'legislative', 'local government']).withMessage('Office type must either be federal, state, legislative or local government'),
  ],
  checkRegister: [
    check('office').isInt().withMessage('Office Id must be a number').isLength({ min: 1 })
      .withMessage('Office Id cannot be empty'),
    check('party').isInt().withMessage('Party Id must be a number').isLength({ min: 1 })
      .withMessage('Party Id cannot be empty'),
  ],
  checkOfficeById: [...checkOfficeId],
  checkUserById: [...checkUserById],
};

export default validation;
