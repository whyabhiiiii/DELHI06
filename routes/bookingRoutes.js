const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBooking, confirmBooking, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect); // All booking routes require auth

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/:id', getBooking);
router.put('/:id/confirm', confirmBooking);
router.put('/:id/cancel', cancelBooking);

module.exports = router;
