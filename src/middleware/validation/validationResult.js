import { validationResult } from 'express-validator/check';

function validateResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      error: errors.array()[0].msg,
    });
  }
  return next();
}

export default validateResult;
