const bcrypt = require('bcrypt');
const { User } = require('../models');

// Helper function to extract data from the request
const extractData = (req) => {
  const bodyData = req.body;
  const queryData = req.query;
  const headerData = {
    username: req.headers['x-username'],
    email: req.headers['x-email'],
    password: req.headers['x-password'],
  };

  // Prioritize data from body, then query, then headers
  return {
    username: bodyData.username || queryData.username || headerData.username,
    email: bodyData.email || queryData.email || headerData.email,
    password: bodyData.password || queryData.password || headerData.password,
  };
};

// Register a new user
exports.register = async (req, res) => {
  console.log('Register Endpoint Called');
  console.log('Request Data:', { body: req.body, query: req.query, headers: req.headers });

  const { username, email, password } = extractData(req);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Create a new user
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error Registering User:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  console.log('Login Endpoint Called');
  console.log('Request Data:', { body: req.body, query: req.query, headers: req.headers });

  const { email, password } = extractData(req);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('Retrieved User:', user);

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Provided Password:', password);
    console.log('Stored Hashed Password:', user.password);
    console.log('Password Match Result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Return successful login response
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error Logging In:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
