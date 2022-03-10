const bcrypt = require('bcryptjs');
const { hashPassword } = require('../helpers/helperPassword');
const authRepository = require("../repositories/authRepository");

module.exports = {
    
    userCreate : async (body) =>{      

        body.password = await hashPassword(body.password);

        const user = await authRepository.createUser(body);
        return user
    },

    findUserByEmail: async (email) => {
        const user = await authRepository.findUserByEmail(email);
        if (user === null) return null; 
        return user;
      },
}