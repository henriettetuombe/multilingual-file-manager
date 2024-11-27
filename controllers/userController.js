const bcrypt = require('bcrypt');
const { User } = require('../models');

// Helper function to extract data from request
const extractData = (req) => {
  // Extract from body, query, and headers
  const bodyData = req.body;
  const queryData = req.query;
  const headerData = {
    username: req.headers['x-username'],
    email: req.headers['x-email'],
    password: req.headers['x-password'],
  };

  // Choose which data source to prioritize
  return {
    username: bodyData.username || queryData.username || headerData.username,
    email: bodyData.email || queryData.email || headerData.email,
    password: bodyData.password || queryData.password || headerData.password,
  };
};

// Register a new user
exports.register = async (req, res) => {
  // Log incoming request details
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Query:', req.query);

  // Extract user data from request
  const { username, email, password } = extractData(req);
  console.log('Extracted Data:', { username, email, password });

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    // Handle error during user registration
    console.error('Error:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  // Log incoming request details
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Query:', req.query);

  // Extract user data from request
  const { email, password } = extractData(req);
  console.log('Extracted Data:', { email, password });

  // Check if all required fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the user record by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    res.status(200).json(user);
  } catch (error) {
    // Handle error during user login
    console.error('Error:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};