import { check } from 'express-validator/check';

const checkPartyId = [check('id').matches(/^\d+$/).withMessage('Party id must be a number')];

const validation = {
  checkAddParty: [
    check('name').isLength({ min: 1 }).withMessage('Party name cannot be empty'),
    check('hqAddress').isLength({ min: 1 }).withMessage('Party Address cannot be empty'),
    check('logoUrl').isURL().withMessage('Enter a valid Url'),
  ],
  checkPartyById: [...checkPartyId],
  checkEditParty: [check('name').isLength({ min: 1 }).withMessage('Party name cannot be empty')],
};

export default validation;
