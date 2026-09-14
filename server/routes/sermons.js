const express = require('express');
const router = express.Router();
const { getSermons, createSermon, updateSermon, deleteSermon } = require('../controllers/sermonController');
const { authenticate, authorise } = require('../middleware/auth');

router.get('/', authenticate, getSermons);
router.post('/', authenticate, authorise('admin'), createSermon);
router.put('/:id', authenticate, authorise('admin'), updateSermon);
router.delete('/:id', authenticate, authorise('admin'), deleteSermon);

module.exports = router;