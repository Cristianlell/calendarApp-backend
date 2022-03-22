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
        
        const user = await authRepository.findUserByEmail(body.email);
        if (user) {
            error.status = httpStatus.BAD_REQUEST
            error.message = {message:message.DUPLICATE_EMAIL,body:user.email}
        
            throw error
        }
        body.password = await hashPassword(body.password);
        
        const createUser = await authRepository.createUser(body);
        
        response = {
            name: createUser.name,
            email: createUser.email,
            _id: createUser._id,
        }
        response.token = generateAccessToken(response)
        return response
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