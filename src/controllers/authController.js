const authService = require("../services/authService");
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const helperPassword = require("../helpers/helperPassword");
const { generateAccessToken } = require("../helpers/jsonWebToken");



module.exports = {
    userCreate : async (req,res)=>{
        
        try {
            let user = await authService.userCreate(req.body);
            return res.status(httpStatus.CREATED).json({ message: message.CREATED, body: user });    
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR, body: error });    
            
        }
    },

    userLogin: async (req,res)=>{
        let user = await authService.findUserByEmail(req.body.email)
        user = user._doc
        try {
            if (user === null){
                return res.status(httpStatus.NOT_FOUND).json({message:message.NOT_FOUND,body:user})
            }
            
            const validPassword = await helperPassword.comparePassword(
            req.body.password,
            user.password
            );

            if (!validPassword) {
                return res.status(httpStatus.UNAUTHORIZED).json({message:message.UNAUTHORIZED, body:validPassword})
            }

            delete user.password
            let token = generateAccessToken(user)
            console.log(user);
          
        
            return res.status(httpStatus.OK).json({message:message.OK,body:user,token:token})
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR,body : error})
        }
            
    }
}