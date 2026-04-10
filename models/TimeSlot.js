const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: [true, 'Activity reference is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  date: {
    type: Date,
    required: false,
  },
  maxCapacity: {
    type: Number,
    default: 8,
  },
  bookedCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  recurring: {
    type: Boolean,
    default: true,
  },
  daysOfWeek: {
    type: [Number],   // 0=Sun, 1=Mon, ..., 6=Sat
    default: [0, 1, 2, 3, 4, 5, 6],
  },
}, {
  timestamps: true,
});

// Virtual: available spots
timeSlotSchema.virtual('availableSpots').get(function () {
  return this.maxCapacity - this.bookedCount;
});

timeSlotSchema.set('toJSON', { virtuals: true });
timeSlotSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
