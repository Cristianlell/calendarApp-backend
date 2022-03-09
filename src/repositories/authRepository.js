const User = require('../database/models/users')

module.exports = {
    createUser : async (body) => {

        const user = await User.create(body)
        console.log(user)
        return user;
    }


}