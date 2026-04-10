const express = require('express');
const router = express.Router();
const { getActivities, getActivity, createActivity, updateActivity, deleteActivity } = require('../controllers/activityController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getActivities)
  .post(protect, authorize('admin'), createActivity);

router.route('/:idOrSlug')
  .get(getActivity);

router.route('/:id')
  .put(protect, authorize('admin'), updateActivity)
  .delete(protect, authorize('admin'), deleteActivity);

module.exports = router;
