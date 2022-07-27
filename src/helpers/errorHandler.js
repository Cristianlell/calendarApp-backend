const code = require("../constants/httpStatus");
const message = require("../constants/messages.js");

const hasCustomError = (err) => typeof err.customError !== "undefined";
let errorToSend = {};

const errorHandler = (err, req, res) => {

     if (!hasCustomError(err)) {
          errorToSend = {
               status: err.status || code.INTERNAL_SERVER_ERROR,
               message:
                    err.status === code.NOT_FOUND
                         ? message.NOT_FOUND
                         : message.INTERNAL_SERVER_ERROR,
               body: err.message,
          };

          return res.status(errorToSend.status).json(errorToSend);
     }


     errorToSend = {
          status: err.customError.status,
          message: err.customError.message,
          rawMessage: err.customError.body,
     };

     return res.status(errorToSend.status).json(errorToSend);
};


module.exports = {
     errorHandler,
};