const { validateToken } = require("../helpers/jsonWebToken");
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/messages');
const throwError = require("../helpers/throwError");


module.exports = (req, res, next) => {
    
    const {payload,err} = validateToken(req);
    if (payload === null) return throwError(httpStatus.FORBIDDEN,message.FORBIDDEN,err.message) 

    req.uid = payload.uid;
  
    req.tokenPayload = payload;
  
    return next();
  };