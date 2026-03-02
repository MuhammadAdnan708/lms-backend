const express = require('express');
const router = express.Router();
const { 
  sendMessage, 
  getAllMessages, 
  markAsRead, 
  deleteMessage 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/send', protect, sendMessage);
router.get('/all', protect, authorize('admin'), getAllMessages);
router.put('/:id/read', protect, authorize('admin'), markAsRead);
router.delete('/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;
