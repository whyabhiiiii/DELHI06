const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeSlot',
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required'],
  },
  time: {
    type: String,
    required: [true, 'Booking time is required'],
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
    default: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  guestPhone: {
    type: String,
    default: '',
  },
  specialRequests: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending',
  },
  razorpayOrderId: {
    type: String,
    default: '',
  },
  razorpayPaymentId: {
    type: String,
    default: '',
  },
  razorpaySignature: {
    type: String,
    default: '',
  },
  bookingRef: {
    type: String,
    unique: true,
  },
  cancelReason: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Generate booking reference
bookingSchema.pre('save', function (next) {
  if (!this.bookingRef) {
    const prefix = 'D6';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.bookingRef = `${prefix}-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
