const express = require('express');
const router = express.Router();
const { createPaymentIntent, verifyPayment, getPublishableKey } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/verify-payment', protect, verifyPayment);
router.get('/config', getPublishableKey);

module.exports = router;
