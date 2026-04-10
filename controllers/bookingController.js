const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const TimeSlot = require('../models/TimeSlot');

// @desc    Create booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { activity, date, time, guests, guestName, guestEmail, guestPhone, specialRequests, timeSlot } = req.body;

    // Find activity to get price
    const act = await Activity.findById(activity);
    if (!act) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const totalAmount = act.price * guests;

    const booking = await Booking.create({
      user: req.user._id,
      activity,
      timeSlot,
      date,
      time,
      guests,
      totalAmount,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
    });

    // Increment bookedCount on time slot if provided
    if (timeSlot) {
      await TimeSlot.findByIdAndUpdate(timeSlot, {
        $inc: { bookedCount: guests },
      });
    }

    const populatedBooking = await Booking.findById(booking._id)
      .populate('activity', 'title slug coverImage duration price')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my bookings
// @route   GET /api/bookings/my
exports.getMyBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('activity', 'title slug coverImage duration price category')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      count: bookings.length,
      total,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('activity')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Ensure user owns the booking or is admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Confirm booking (after payment)
// @route   PUT /api/bookings/:id/confirm
exports.confirmBooking = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    // First verify the booking exists and the user owns it (or is admin)
    const existingBooking = await Booking.findById(req.params.id);
    if (!existingBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (existingBooking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: 'confirmed',
        paymentStatus: 'paid',
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      },
      { new: true }
    ).populate('activity', 'title slug coverImage duration price');

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    booking.cancelReason = reason || '';
    await booking.save();

    // Release time slot capacity
    if (booking.timeSlot) {
      await TimeSlot.findByIdAndUpdate(booking.timeSlot, {
        $inc: { bookedCount: -booking.guests },
      });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
