const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  shortDescription: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Food & Culinary', 'Heritage & History', 'Markets & Shopping', 'Arts & Craft'],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    default: 3,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  maxGroupSize: {
    type: Number,
    default: 8,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging'],
    default: 'easy',
  },
  images: {
    type: [String],
    default: [],
  },
  coverImage: {
    type: String,
    default: '',
  },
  highlights: {
    type: [String],
    default: [],
  },
  includes: {
    type: [String],
    default: [],
  },
  meetingPoint: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
    default: '',
  },
  badgeColor: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Auto-generate slug from title
activitySchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Activity', activitySchema);
