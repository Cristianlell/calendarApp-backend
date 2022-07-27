const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/messages');
const throwError = require('../helpers/throwError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throwError(httpStatus.BAD_REQUEST, message.BAD_REQUEST, errors.mapped())
  }
  next();
};
