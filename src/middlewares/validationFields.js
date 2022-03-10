const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/messages');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({message:message.BAD_REQUEST,body:errors.mapped()})
  }
  next();
};
