const eventServices = require("../services/eventService")
const httpStatus = require('../constants/httpStatus')
const message = require('../constants/messages');
const { catchAsync } = require("../helpers/catchAsync");

module.exports = {
    getAll: catchAsync(async (req, res) => {
        const events = await eventServices.getAll(req, 'name');

        return res.status(httpStatus.OK).json({ message: message.OK, body: events })
    }),

    create: catchAsync(async (req, res) => {
        let events = await eventServices.create(req);
        return res.status(httpStatus.CREATED).json({ ok: message.CREATED, body: events })
    }),

    update: catchAsync(async (req, res) => {
        let result = await eventServices.update(req);
        return res.status(httpStatus.OK).json({ ok: message.OK, body: result })
    }),

    remove: catchAsync(async (req, res) => {
        let result = await eventServices.remove(req);
        return res.status(httpStatus.OK).json({ ok: message.OK, body: result })
    })
}