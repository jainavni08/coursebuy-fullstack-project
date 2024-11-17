const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');



router.use(express.json());
// Route for creating a new event

router.post('/create',eventController.create);

// Route to get all events
router.get('/events', eventController.getAllEvents);

// Route to get a specific event by eventId
router.get('/events/:eventid', eventController.getEventById);

// Route to update a specific event by eventId
router.put('/events/:eventid', eventController.updateEvent); // New route to update an event

router.delete('/events/:eventid', eventController.deleteEvent);


module.exports = router;

