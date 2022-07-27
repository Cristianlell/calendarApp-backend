const Event = require('../database/models/Events')

module.exports = {
  getAll: async (uid, key) => {
    return await Event.find({ user: uid }).populate('user', key)
  },

  getById: async (id) => {
    return await Event.findById(id)
  },

  create: async (event) => {
    return await Event.create(event);
  },

  update: async (id, body) => {
    return await Event.findByIdAndUpdate(id, body)
  },

  remove: async (id) => {
    return await Event.findByIdAndDelete(id);
  }
}