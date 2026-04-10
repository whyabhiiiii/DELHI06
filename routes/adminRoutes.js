const express = require('express');
const router = express.Router();
const { getStats, getUsers, getAllBookings, updateBookingStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);

module.exports = router;
