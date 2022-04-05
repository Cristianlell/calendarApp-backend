require('dotenv').config();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('./getTokenFrom');
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');


module.exports = {
  generateAccessToken: (user) => {
    if (!user._id || !user.email) {
      let error = new Error

      error.status = httpStatus.BAD_REQUEST;
      error.message = {ok:false,message:message.BAD_REQUEST,body:{email:user.email || null,_id:user._id || null}}
      throw error
    }
    user = {
      email: user.email,
      role: "usuario",
      uid: user._id
    };

    const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '4h'});

    return token; 
  },

  validateToken: (req) => {
    const token = getTokenFrom(req);
    if (!token) return null; 

    try {
      const user = jwt.verify(token, process.env.ACCESS_SECRET);
      return user; //
    } catch (err) {
      throw err;
    }
  },

};