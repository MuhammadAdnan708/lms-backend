const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  addReview, 
  updateReview, 
  deleteReview, 
  getCourseReviews,
  getStudentReview 
} = require('../controllers/reviewController');

router.post('/', protect, addReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.get('/course/:courseId', getCourseReviews);
router.get('/course/:courseId/my-review', protect, getStudentReview);

module.exports = router;
