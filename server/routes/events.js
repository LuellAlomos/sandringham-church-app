const express = require('express');
const router = express.Router();
const { getEvents, createEvent, updateEvent, deleteEvent, rsvpEvent, cancelRsvp, getEventRsvps } = require('../controllers/eventController');
const { authenticate, authorise } = require('../middleware/auth');

router.get('/', getEvents);
router.post('/', authenticate, authorise('admin'), createEvent);
router.put('/:id', authenticate, authorise('admin'), updateEvent);
router.delete('/:id', authenticate, authorise('admin'), deleteEvent);
router.post('/:id/rsvp', authenticate, rsvpEvent);
router.delete('/:id/rsvp', authenticate, cancelRsvp);
router.get('/:id/rsvps', authenticate, authorise('admin'), getEventRsvps);

module.exports = router;