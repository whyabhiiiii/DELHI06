const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    trim: true,
    default: '',
  },
  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
    trim: true,
    maxlength: [1000, 'Review cannot exceed 1000 characters'],
  },
}, {
  timestamps: true,
});

// Prevent duplicate reviews (one review per user per activity)
reviewSchema.index({ user: 1, activity: 1 }, { unique: true });

// Static method to calculate average rating for an activity
reviewSchema.statics.calcAverageRating = async function (activityId) {
  const stats = await this.aggregate([
    { $match: { activity: activityId } },
    {
      $group: {
        _id: '$activity',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await mongoose.model('Activity').findByIdAndUpdate(activityId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  }
};

// Recalculate rating after save
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.activity);
});

module.exports = mongoose.model('Review', reviewSchema);
