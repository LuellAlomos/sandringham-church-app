const express = require('express');
const router = express.Router();
const { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const { authenticate, authorise } = require('../middleware/auth');

router.get('/', authenticate, getAnnouncements);
router.post('/', authenticate, authorise('admin'), createAnnouncement);
router.patch('/:id', authenticate, authorise('admin'), updateAnnouncement);
router.delete('/:id', authenticate, authorise('admin'), deleteAnnouncement);

module.exports = router;