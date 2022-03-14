const eventServices = require("../services/eventService")
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');


module.exports = {
    getAll: async (req,res) =>{
        
        try {
            const events = await eventServices.getAll(req,'name');
            console.log(events);
            return res.status(httpStatus.OK).json({message:message.OK,body:events ? events : []})

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR,body : error})
        }
    },

    create: async (req,res) =>{
        try {
           
           let events = await eventServices.create(req);

            return res.status(httpStatus.CREATED).json({message:message.CREATED,body:events})

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR,body : error})
        }
    },

    update: async (req,res) =>{
        try {
            let result = await eventServices.update(req);
            return res.status(httpStatus.OK).json({message:message.OK,body:result})

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR,body : error})
        }
    },

    remove: async (req,res) => {
        try {
            let result = await eventServices.remove(req);
            return res.status(httpStatus.OK).json({message:message.OK,body:result})

        } catch (error) {
            console.log(error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:message.INTERNAL_SERVER_ERROR,body : error})
        }
    }
}