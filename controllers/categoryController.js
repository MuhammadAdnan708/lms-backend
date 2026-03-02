const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name, description, icon });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, isActive } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, icon, isActive },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.seedCategories = async () => {
  const defaultCategories = [
    { name: 'Programming', description: 'Learn programming languages', icon: '💻' },
    { name: 'Web Development', description: 'Build websites and web apps', icon: '🌐' },
    { name: 'Mobile Development', description: 'Create mobile applications', icon: '📱' },
    { name: 'Data Science', description: 'Analyze data and build models', icon: '📊' },
    { name: 'Machine Learning', description: 'AI and ML fundamentals', icon: '🤖' },
    { name: 'Design', description: 'Graphic and UI/UX design', icon: '🎨' },
    { name: 'Business', description: 'Business and entrepreneurship', icon: '💼' },
    { name: 'Marketing', description: 'Digital marketing', icon: '📢' },
    { name: 'Science', description: 'Science and mathematics', icon: '🔬' },
    { name: 'Language', description: 'Language learning', icon: '🌍' }
  ];

  for (const cat of defaultCategories) {
    await Category.findOneAndUpdate(
      { name: cat.name },
      cat,
      { upsert: true, new: true }
    );
  }
  console.log('Categories seeded successfully');
};
