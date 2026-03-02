require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', videoRoutes);

// Seed Categories (Optional - safer for production)
if (process.env.NODE_ENV !== "production") {
  const seedCategories = require('./controllers/categoryController');
  seedCategories.seedCategories();
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test Route
app.get('/api/test-courses', async (req, res) => {
  try {
    const Course = require('./models/Course');
    const courses = await Course.find().limit(5);
    res.json({ count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// IMPORTANT: Export app for Vercel (No app.listen here)
module.exports = app;
