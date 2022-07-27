const {
     INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_CODE,
} = require("../constants/httpStatus");
const {
     INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_MESSAGE,
} = require("../constants/messages");

module.exports = (status, message, body) => {
     const errorToThrow = new Error();
     errorToThrow.customError = { status, message, body };

     if (![status, message].every(Boolean)) {

          errorToThrow.customError = {
               status: INTERNAL_SERVER_ERROR_CODE,
               message: INTERNAL_SERVER_ERROR_MESSAGE,
               body: INTERNAL_SERVER_ERROR_MESSAGE,
          };
     }

     throw errorToThrow;
};