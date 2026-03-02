const Message = require('../models/Message');
const emailService = require('../utils/emailService');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const message = await Message.create({
      name,
      email,
      description
    });

    emailService.sendContactForm({
      name,
      email,
      description,
      toEmail: 'm.adnan22708@gmail.com'
    }).catch(err => console.log('Email error:', err.message));

    res.status(201).json({ 
      success: true,
      message: 'Thank you for your feedback!',
      data: message
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort('-createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
