import { check } from 'express-validator/check';

const checkOfficeId = [check('id').matches(/^\d+$/).withMessage('Office Id must be a number')];

const validation = {
  checkAddOffice: [
    check('name').isLength({ min: 1 }).withMessage('Office name cannot be empty'),
    check('type').isIn(['federal', 'state', 'legislative', 'local government']).withMessage('Office type must either be fedral, state, legislative or local government'),
  ],
  checkOfficeById: [...checkOfficeId],
};

export default validation;