const Review = require('../models/Review');
const Course = require('../models/Course');

exports.addReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const studentId = req.user._id;

    const existingReview = await Review.findOne({ course: courseId, student: studentId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this course' });
    }

    const review = await Review.create({
      course: courseId,
      student: studentId,
      rating,
      comment
    });

    await updateCourseRating(courseId);

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const studentId = req.user._id;

    const review = await Review.findOne({ _id: reviewId, student: studentId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    await updateCourseRating(review.course);

    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findOne({ _id: reviewId, student: userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const courseId = review.course;
    await Review.findByIdAndDelete(reviewId);
    
    await updateCourseRating(courseId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourseReviews = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const reviews = await Review.find({ course: courseId })
      .populate('student', 'name')
      .sort('-createdAt');

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : 0;

    res.json({ reviews, totalReviews, averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentReview = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user._id;

    const review = await Review.findOne({ course: courseId, student: studentId });

    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updateCourseRating(courseId) {
  const reviews = await Review.find({ course: courseId });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews)
    : 0;

  await Course.findByIdAndUpdate(courseId, {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews
  });
}
