const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getAnalytics, getPendingInstructors, approveInstructor, rejectInstructor } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getUsers);
router.get('/analytics', protect, authorize('admin'), getAnalytics);
router.get('/pending-instructors', protect, authorize('admin'), getPendingInstructors);
router.put('/:id/approve', protect, authorize('admin'), approveInstructor);
router.put('/:id/reject', protect, authorize('admin'), rejectInstructor);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
