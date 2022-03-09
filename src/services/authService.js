const authRepository = require("../repositories/authRepository");


module.exports = {
    userCreate : async (body) =>{      
        const user = await authRepository.createUser(body);
        
        if (!user) {
           return r;
        }
        return user
    }
}