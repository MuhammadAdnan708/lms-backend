const express = require('express');
const router = express.Router();
const { 
  enrollCourse, 
  getMyEnrollments,
  getEnrollmentProgress,
  updateProgress,
  getAllEnrollments
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/enroll', protect, enrollCourse);
router.get('/my-courses', protect, getMyEnrollments);
router.get('/all', protect, authorize('admin'), getAllEnrollments);
router.get('/:courseId', protect, getEnrollmentProgress);
router.put('/:courseId/progress', protect, updateProgress);

module.exports = router;
