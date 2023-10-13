const express = require('express');
const {createEvent, getEvents, deleteEvent, updateEvent
} = require('../controllers/eventController.js');
const {requireAuth} = require('../middlewares/requireAuth.js');

const router = express.Router();

//path specified is relative to the orginal route wrt which the use method's called

//require authentication for all Event routes
router.use(requireAuth);

//get all Events
router.get('/',getEvents); 

//create a Event
router.post('/',createEvent);

//delete a Event
router.delete('/:id',deleteEvent);

//update a Event
router.patch('/:id',updateEvent);

module.exports = router;