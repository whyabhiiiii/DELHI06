const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
exports.createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate('activity', 'title');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const options = {
      amount: Math.round(booking.totalAmount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: booking.bookingRef,
      notes: {
        bookingId: booking._id.toString(),
        activityTitle: booking.activity?.title || 'Delhi 6 Experience',
        guestName: booking.guestName,
      },
    };

    const order = await razorpay.orders.create(options);

    // Save order ID to booking
    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        bookingRef: booking.bookingRef,
        key: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    // Verify booking exists and belongs to the authenticated user
    const existingBooking = await Booking.findById(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (existingBooking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to verify this payment' });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed — signature mismatch',
      });
    }

    // Update booking
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: 'confirmed',
        paymentStatus: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    ).populate('activity', 'title slug coverImage duration price');

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
