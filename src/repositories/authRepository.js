const User = require('../database/models/Users')

module.exports = {
    findUserByEmail: async (email) => {
        const user = await User.findOne({ email })
        return user
    },

    createUser: async (body) => {
        const user = await User.create(body)
        return user;
    },



}