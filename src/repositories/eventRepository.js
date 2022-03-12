const Event = require('../database/models/Events')

module.exports = {
    getAll: async () =>{
      return await Event.find().populate('user','name')
    },

    create: async (note) =>{
        return await Event.create(note);
    },

    update: async (note) =>{

    },

    remove: async (note) => {
        
    }
}