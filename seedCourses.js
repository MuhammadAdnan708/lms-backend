const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

const sampleCourses = [
  {
    title: 'Complete Python Programming',
    description: 'Learn Python from scratch to advanced level. This comprehensive course covers everything from basics to advanced concepts like OOP, databases, and web development with Django.',
    category: 'Programming',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to Python', content: 'Getting started with Python', duration: 15 },
      { title: 'Variables and Data Types', content: 'Understanding Python variables', duration: 20 },
      { title: 'Control Flow', content: 'If statements and loops', duration: 25 },
      { title: 'Functions', content: 'Creating and using functions', duration: 30 },
      { title: 'Object Oriented Programming', content: 'Classes and objects', duration: 35 }
    ]
  },
  {
    title: 'Web Development with React',
    description: 'Master React.js from basics to advanced. Build modern web applications with hooks, context API, and integrate with backend APIs.',
    category: 'Programming',
    price: 59.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to React', content: 'Setting up React environment', duration: 20 },
      { title: 'JSX and Components', content: 'Understanding JSX syntax', duration: 25 },
      { title: 'React Hooks', content: 'useState, useEffect, useContext', duration: 30 },
      { title: 'State Management', content: 'Managing application state', duration: 35 }
    ]
  },
  {
    title: 'Graphic Design Fundamentals',
    description: 'Learn the principles of graphic design. Master color theory, typography, layout design, and create stunning visual content.',
    category: 'Design',
    price: 39.99,
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to Design', content: 'Design principles overview', duration: 15 },
      { title: 'Color Theory', content: 'Understanding colors', duration: 20 },
      { title: 'Typography', content: 'Font selection and pairing', duration: 25 },
      { title: 'Layout Design', content: 'Creating balanced layouts', duration: 30 }
    ]
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful and user-friendly interfaces. Learn Figma, wireframing, prototyping, and user research techniques.',
    category: 'Design',
    price: 69.99,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to UI/UX', content: 'What is UI/UX design?', duration: 15 },
      { title: 'User Research', content: 'Understanding users', duration: 25 },
      { title: 'Wireframing', content: 'Creating wireframes', duration: 30 },
      { title: 'Prototyping', content: 'Building interactive prototypes', duration: 35 }
    ]
  },
  {
    title: 'Digital Marketing Strategy',
    description: 'Learn modern digital marketing techniques. SEO, social media marketing, content marketing, and paid advertising strategies.',
    category: 'Marketing',
    price: 44.99,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Digital Marketing Overview', content: 'Introduction to digital marketing', duration: 15 },
      { title: 'SEO Fundamentals', content: 'Search engine optimization', duration: 25 },
      { title: 'Social Media Marketing', content: 'Marketing on social platforms', duration: 30 },
      { title: 'Content Marketing', content: 'Creating engaging content', duration: 25 }
    ]
  },
  {
    title: 'Business Management Essentials',
    description: 'Master business fundamentals. Learn management principles, leadership skills, strategic planning, and organizational behavior.',
    category: 'Business',
    price: 54.99,
    thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to Business', content: 'Business fundamentals', duration: 20 },
      { title: 'Management Principles', content: 'Core management concepts', duration: 25 },
      { title: 'Leadership Skills', content: 'Becoming an effective leader', duration: 30 },
      { title: 'Strategic Planning', content: 'Planning for success', duration: 35 }
    ]
  },
  {
    title: 'Data Science with Python',
    description: 'Analyze data like a pro. Learn pandas, numpy, matplotlib, and machine learning basics with Python.',
    category: 'Data Science',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to Data Science', content: 'What is data science?', duration: 20 },
      { title: 'Python for Data Analysis', content: 'Pandas and NumPy', duration: 30 },
      { title: 'Data Visualization', content: 'Creating charts with Matplotlib', duration: 25 },
      { title: 'Machine Learning Basics', content: 'Introduction to ML', duration: 40 }
    ]
  },
  {
    title: 'Physics for Beginners',
    description: 'Explore the wonders of physics. From mechanics to electromagnetism, understand how the universe works.',
    category: 'Science',
    price: 34.99,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop',
    lessons: [
      { title: 'Introduction to Physics', content: 'What is physics?', duration: 15 },
      { title: 'Mechanics', content: 'Motion and forces', duration: 25 },
      { title: 'Thermodynamics', content: 'Heat and energy', duration: 20 },
      { title: 'Electromagnetism', content: 'Electricity and magnetism', duration: 30 }
    ]
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find or create admin/instructor
    let instructor = await User.findOne({ role: 'instructor' });
    if (!instructor) {
      instructor = await User.findOne({ role: 'admin' });
    }
    if (!instructor) {
      // Create a default instructor
      instructor = await User.create({
        name: 'Learnix Instructor',
        email: 'instructor@learnix.com',
        password: 'password123',
        role: 'instructor',
        isVerified: true
      });
      console.log('Created default instructor');
    }

    // Check if courses already exist
    const existingCourses = await Course.countDocuments();
    if (existingCourses > 0) {
      console.log(`Database already has ${existingCourses} courses`);
      await mongoose.disconnect();
      return;
    }

    // Create sample courses
    for (const courseData of sampleCourses) {
      await Course.create({
        ...courseData,
        instructor: instructor._id,
        isPublished: true
      });
    }

    console.log(`Successfully added ${sampleCourses.length} courses`);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedCourses();
