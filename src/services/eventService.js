const eventRepository = require("../repositories/eventRepository")
const error = new Error;
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const moment = require("moment");


module.exports = {
    getAll: async (req,key) =>{
        let {uid} = req 
        let events = await eventRepository.getAll(uid,key);
        
        return events;

    },

    create: async (req) =>{
        let event = req.body;
        event.start = moment(event.start).format()
        event.end = moment(event.end).format()

        event.user = req.uid
        
        let result = await eventRepository.create(event) 

        return result;
        
    },

    update: async (req) =>{
        let {id} = req.params;
        
        const event = await eventRepository.getById(id)
        
        if(!event){
            error.status = httpStatus.NOT_FOUND;
            error.message = {messge:message.NOT_FOUND, body:event};
           
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
        console.log("id del evento: ",id);
        const event = await eventRepository.getById(id)
        console.log("evento a borrar: ",event)
        if(!event){
            error.status = httpStatus.NOT_FOUND;
            error.message ={ messge:message.NOT_FOUND, body:event};
           
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
