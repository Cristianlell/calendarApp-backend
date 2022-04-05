const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/messages');
const error = new Error();

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.mapped())
  if (!errors.isEmpty()) {
    error.status = httpStatus.BAD_REQUEST;
    error.message = message.BAD_REQUEST
    error.body = errors.mapped();
    throw error
    
  }
  next();
};
