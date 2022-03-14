const eventRepository = require("../repositories/eventRepository")
const error = new Error;
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');


module.exports = {
    getAll: async (req,key) =>{
        let {uid} = req 
        return await eventRepository.getAll(uid,key);

    },

    create: async (req) =>{
        let event = req.body;
        event.user = req.uid
        console.log(event)
        let result = await eventRepository.create(event) 

        return result;
        
    },

    update: async (req) =>{
        let {id} = req.params;
        
        const event = await eventRepository.getById(id)
        
        if(!event){
            error.status = httpStatus.NOT_FOUND;
            error.message = message.NOT_FOUND;
           
            throw error
        }

        if(event.user.toString() !== req.uid){
            error.status = httpStatus.UNAUTHORIZED;
            error.message = message.UNAUTHORIZED;
            throw error
        }

        let result = await eventRepository.update(id,req.body)
        return result
    },

    remove: async (req) => {
        let {id} = req.params;
        
        const event = await eventRepository.getById(id)
        console.log(event)
        if(!event){
            error.status = httpStatus.NOT_FOUND;
            error.message = message.NOT_FOUND;
           
            throw error
        }

        if(event.user.toString() !== req.uid){
            error.status = httpStatus.UNAUTHORIZED;
            error.message = message.UNAUTHORIZED;
            throw error
        }

        return await eventRepository.remove(id)
    }
}
