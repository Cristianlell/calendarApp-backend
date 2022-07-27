const eventRepository = require("../repositories/eventRepository")
const error = new Error;
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const moment = require("moment");
const throwError = require("../helpers/throwError");

module.exports = {
    getAll: async (req,key) =>{
        let {uid} = req 
        let events = await eventRepository.getAll(uid,key);
        if (!events) {
            return throwError(code.NOT_FOUND, message.NOT_FOUND);
        }
        
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
            throwError(httpStatus.NOT_FOUND, message.NOT_FOUND)
        }

        if(event.user.toString() !== req.uid){
            throwError(httpStatus.UNAUTHORIZED,message.UNAUTHORIZED)
        }

        let result = await eventRepository.update(id,req.body)
        return result
    },

    remove: async (req) => {
        let {id} = req.params;
        const event = await eventRepository.getById(id)
        if(!event){
            throwError(httpStatus.NOT_FOUND, message.NOT_FOUND)
        }

        if(event.user.toString() !== req.uid){
            throwError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED)
        }

        return await eventRepository.remove(id)
    }
}
