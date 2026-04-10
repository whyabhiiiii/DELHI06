const express = require('express');
const router = express.Router();
const { getTimeSlots, createTimeSlot, updateTimeSlot, deleteTimeSlot } = require('../controllers/timeslotController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTimeSlots);
router.post('/', protect, authorize('admin'), createTimeSlot);
router.put('/:id', protect, authorize('admin'), updateTimeSlot);
router.delete('/:id', protect, authorize('admin'), deleteTimeSlot);

module.exports = router;
