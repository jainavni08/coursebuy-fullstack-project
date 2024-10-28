// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/events/create', eventController.createEvent);
// Route to get all events
router.get('/events', eventController.getAllEvents);

router.get('/events/:eventid', eventController.getEventById); 

module.exports = router;
