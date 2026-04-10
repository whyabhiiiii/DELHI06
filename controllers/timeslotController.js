const TimeSlot = require('../models/TimeSlot');

// @desc    Get time slots for an activity
// @route   GET /api/timeslots
exports.getTimeSlots = async (req, res) => {
  try {
    const { activity, date } = req.query;

    if (!activity) {
      return res.status(400).json({
        success: false,
        message: 'Activity ID is required.',
      });
    }

    const filter = { activity, isActive: true };

    // If date provided, filter by day of week for recurring slots
    if (date) {
      const dayOfWeek = new Date(date).getDay();
      filter.daysOfWeek = dayOfWeek;
    }

    const slots = await TimeSlot.find(filter)
      .populate('activity', 'title maxGroupSize')
      .sort({ time: 1 });

    res.json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create time slot (admin)
// @route   POST /api/timeslots
exports.createTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.create(req.body);
    res.status(201).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update time slot (admin)
// @route   PUT /api/timeslots/:id
exports.updateTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!slot) {
      return res.status(404).json({ success: false, message: 'Time slot not found' });
    }

    res.json({ success: true, data: slot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete time slot (admin)
// @route   DELETE /api/timeslots/:id
exports.deleteTimeSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndDelete(req.params.id);

    if (!slot) {
      return res.status(404).json({ success: false, message: 'Time slot not found' });
    }

    res.json({ success: true, message: 'Time slot deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
