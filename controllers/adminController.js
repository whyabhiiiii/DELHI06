const User = require('../models/User');
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const Review = require('../models/Review');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalBookings, totalActivities, totalReviews] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Activity.countDocuments(),
      Review.countDocuments(),
    ]);

    const revenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('activity', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        totalActivities,
        totalReviews,
        totalRevenue: revenue[0]?.total || 0,
        recentBookings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/admin/bookings
exports.getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('activity', 'title slug price')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(filter);

    res.json({ success: true, count: bookings.length, total, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (admin)
// @route   PUT /api/admin/bookings/:id
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, paymentStatus: req.body.paymentStatus },
      { new: true }
    ).populate('activity', 'title').populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
