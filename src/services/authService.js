const bcrypt = require('bcryptjs');
const { hashPassword } = require('../helpers/helperPassword');
const authRepository = require("../repositories/authRepository");
const { generateAccessToken } = require("../helpers/jsonWebToken");
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const helperPassword = require("../helpers/helperPassword");


const error = new Error();

module.exports = {
    
    userCreate : async (body) =>{      

        body.password = await hashPassword(body.password);

        user = {
            name: user.name,
            email: user.email,
            _id: user._id,
        }
        console.log(user);
       user.token = generateAccessToken(user)
        const user = await authRepository.createUser(body);
        return user
    },

    findUserByEmail: async (email) => {
        const user = await authRepository.findUserByEmail(email);
        if (user === null) return null; 
        return user;
    },

    login:async (req) => {
        let user = await authRepository.findUserByEmail(req.body.email)
        
        user = user ? user._doc : null
        if (user === null){
            error.status = httpStatus.NOT_FOUND
            error.message = {message:message.NOT_FOUND,body:user}
        
            throw error
        }
        
        const validPassword = await helperPassword.comparePassword(
        req.body.password,
        user.password
        );

        console.log(validPassword);
        if (!validPassword) {
            error.status = httpStatus.UNAUTHORIZED
            error.message = {message:message.UNAUTHORIZED,body:'credenciales inválidas'}
            throw error
        }

        delete user.password
        user.token = generateAccessToken(user)
        return user
    }
}