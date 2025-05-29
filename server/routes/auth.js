const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model includes fields for additional data
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../firebase');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, fullName, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    // Extract additional data from the request body
    const { location, interests, dreams, achievements } = req.body;

    // Create a new user instance
    user = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      location,
      interests,
      dreams,
      achievements,
    });

    // Save the user to the database
    await user.save();

    // Get the Firebase UID
    const firebaseUser = await auth.getUserByEmail(email);

    // Update the user's _id with the Firebase UID
    user._id = firebaseUser.uid;
    await user.save();


    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;