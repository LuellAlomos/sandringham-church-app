const express = require('express');
const router = express.Router();
const { submitPrayer, getPrayers, moderatePrayer, getMyPrayers } = require('../controllers/prayerController');
const { authenticate, authorise } = require('../middleware/auth');

router.post('/', authenticate, submitPrayer);
router.get('/my', authenticate, getMyPrayers);
router.get('/', authenticate, authorise('admin'), getPrayers);
router.patch('/:id', authenticate, authorise('admin'), moderatePrayer);

module.exports = router;