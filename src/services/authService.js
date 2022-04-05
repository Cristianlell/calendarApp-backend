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
            error.message = {ok:false,message:message.DUPLICATE_EMAIL,body:user.email}
        
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
            error.message = {ok:false,message:message.NOT_FOUND,body:user}
        
            throw error
        }
        
        const validPassword = await helperPassword.comparePassword(
        req.body.password,
        user.password
        );

        console.log(validPassword);
        if (!validPassword) {
            const error = new Error()
            error.status = httpStatus.UNAUTHORIZED;
            error.message = {ok:false,message:message.UNAUTHORIZED};

            throw error

        }

        delete user.password
        user.token = generateAccessToken(user)
        return user
    },
    revalidateToken : async (req) => {

            let user = {
                email: req.body.email,
                _id: req.body.id
              };
            const token = await generateAccessToken(user);

            return token
     
          
    }
}