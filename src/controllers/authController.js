const authService = require("../services/authService");
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages')



module.exports = {
    userCreate : async (req,res)=>{
        
        try {
            let user = await authService.userCreate(req.body);
            console.log("respuesta user:  ", user)

            return res.status(httpStatus.CREATED).json({ message: message.CREATED, body: user });    
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR, body: error });    
            
        }
        

    }
}