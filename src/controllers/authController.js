const authService = require("../services/authService");
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const { login } = require("../services/authService");




module.exports = {
    userCreate : async (req,res)=>{
        
        try {
            let user = await authService.userCreate(req.body);

            return res.status(httpStatus.CREATED).json({ok:true, message: message.CREATED, body: user });    

        } catch (error) {
            console.log(error)
            return res.status(error.status).json(error.message);    
            
        }
    },

    userLogin: async (req,res)=>{
        try {
            let user = await login(req)
            return res.status(httpStatus.OK).json({ok:true,message:message.OK,body:user})
        } catch (error) {
            return res.status(error.status).json({body:error.message})
        }
            
    },

    revalidateToken : async (req,res) => {

        try {
            let token = await authService.revalidateToken(req)
            console.log(token);
            return res.status(httpStatus.OK).json({ok:true,message:message.OK,body:{token:token}})
        } catch (error) {
            return res.status(error.status).json(error.message)
        }
    }
}