require('dotenv').config();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('./getTokenFrom');


module.exports = {
  generateAccessToken: (user) => {
    if (!user._id || !user.email) return null;

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