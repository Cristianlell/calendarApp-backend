const authService = require("../services/authService");
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const { login } = require("../services/authService");




module.exports = {
    userCreate : async (req,res)=>{
        
        try {
            let user = await authService.userCreate(req.body);

            return res.status(httpStatus.CREATED).json({ message: message.CREATED, body: user });    

        } catch (error) {
            console.log(error)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR, body: error });    
            
        }
    },

    userLogin: async (req,res)=>{
        try {
            let user = await login(req)
            return res.status(httpStatus.OK).json({message:message.OK,body:user})
        } catch (error) {
            return res.status(error.status).json({body:error.message})
        }
            
    },

    revalidateToken : async (req,res) => {

        try {
           let user = {
                email: req.email,
                name:req.name,
                id: req.id
              };
            const token = await generateAccessToken(user)
            return res.status(httpStatus.OK).json({message:message.OK,body:{token:token}})
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR,body : error})
        }
    }
}