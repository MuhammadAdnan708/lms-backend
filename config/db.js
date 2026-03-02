const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if already connected (important for serverless)
    if (mongoose.connection.readyState >= 1) {
      console.log('Already connected to MongoDB');
      return mongoose.connection;
    }

    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      // Add these for better serverless performance
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1,  // Maintain at least 1 socket connection
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    return conn;

  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    
    // IMPORTANT: Don't use process.exit() in serverless!
    // Instead, throw the error to be handled by the caller
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
