const eventServices = require("../services/eventService")
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');


module.exports = {
    getAll: async (req,res) =>{
        
        try {
            const events = await eventServices.getAll();
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

    },

    remove: async (req,res) => {
        
    }
}