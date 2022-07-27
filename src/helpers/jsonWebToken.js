require('dotenv').config();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('./getTokenFrom');
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const throwError = require('./throwError');


module.exports = {
  generateAccessToken: (user) => {
    if (!user._id || !user.email) {
      throwError(httpStatus.BAD_REQUEST, message.BAD_REQUEST, user)
    }
    user = {
      email: user.email,
      role: "usuario",
      uid: user._id
    };

    const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '4h' });

    return token;
  },

  validateToken: (req) => {
    const token = getTokenFrom(req);
    if (!token) return null;
    try {
      const user = jwt.verify(token, process.env.ACCESS_SECRET);
      return user; //
    } catch (err) {
      return { payload: null, err };
    }
  },

};