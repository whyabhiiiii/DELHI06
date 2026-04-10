const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
exports.getActivities = async (req, res) => {
  try {
    const { category, isActive } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const activities = await Activity.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single activity by ID or slug
// @route   GET /api/activities/:idOrSlug
exports.getActivity = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    let activity;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      activity = await Activity.findById(idOrSlug);
    } else {
      activity = await Activity.findOne({ slug: idOrSlug });
    }

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create activity (admin)
// @route   POST /api/activities
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update activity (admin)
// @route   PUT /api/activities/:id
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete activity (admin)
// @route   DELETE /api/activities/:id
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    res.json({
      success: true,
      message: 'Activity deleted',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
