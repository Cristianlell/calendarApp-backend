const eventRepository = require("../repositories/eventRepository")

module.exports = {
    getAll: async () =>{
        const events = await eventRepository.getAll();

    },

    create: async (req) =>{
        let event = req.body;
        event.user = req.uid

        return await eventRepository.create(event);

    },

    update: async (event) =>{

    },

    remove: async (note) => {
        
    }
}