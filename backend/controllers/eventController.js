const Event = require('../models/eventModel.js');
const mongoose = require('mongoose');

// get all Events
const getEvents = async (req, res) => {
    const user_id = req.user._id; // payload of jwt attached to the req body

    const events = await Event.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(events);
}

// create a Event
const createEvent = async (req, res) => {
    const user_id = req.user._id; // attached in the middleware(payload of jwt)

    const { title, date, content } = req.body;
    // add a doc to DB
    try {
        const createdEvent = await Event.create({ title, date, content, user_id });
        res.status(200).json(createdEvent);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

// delete a Event
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such Event found' });

    const deletedEvent = await Event.findOneAndDelete({ _id: id });

    if (!deletedEvent)
        return res.status(404).json({ error: 'No such Event found' });

    res.status(200).json(deletedEvent);
}

// update a Event
const updateEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such Event found' });

    const updatedEvent = await Event.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!updatedEvent)
        return res.status(404).json({ error: 'No such Event found' });

    res.status(200).json(updatedEvent);
}

module.exports = { createEvent, getEvents, deleteEvent, updateEvent };
