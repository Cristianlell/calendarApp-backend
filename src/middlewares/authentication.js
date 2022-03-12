const { validateToken } = require("../helpers/jsonWebToken");
const httpStatus = require('../constants/httpStatus');
const message = require('../constants/messages');


module.exports = (req, res, next) => {
    
    const payload = validateToken(req);
  
    if (payload === null) {
        return res.status(httpStatus.FORBIDDEN).json({message:message.FORBIDDEN,body:payload})
    }
    req.uid = payload.uid;
  
    req.tokenPayload = payload;
  
    return next();
  };