const Review = require('../models/Review');

// @desc    Get reviews (optionally by activity)
// @route   GET /api/reviews
exports.getReviews = async (req, res) => {
  try {
    const { activity, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (activity) filter.activity = activity;

    const reviews = await Review.find(filter)
      .populate('user', 'name avatar')
      .populate('activity', 'title slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Review.countDocuments(filter);

    res.json({
      success: true,
      count: reviews.length,
      total,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create review
// @route   POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { activity, rating, title, comment } = req.body;

    // Check for existing review
    const existing = await Review.findOne({ user: req.user._id, activity });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this activity',
      });
    }

    const review = await Review.create({
      user: req.user._id,
      activity,
      rating,
      title,
      comment,
    });

    const populated = await Review.findById(review._id)
      .populate('user', 'name avatar')
      .populate('activity', 'title slug');

    res.status(201).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await review.deleteOne();

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
