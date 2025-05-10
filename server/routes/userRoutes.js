


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Add this line

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send({ message: 'No token provided!' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Unauthorized!' });
    req.userId = decoded.id;
    next();
  });
};

// GET all users (excluding passwords)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET a single user by ID (excluding password)
router.get("/:id", verifyToken, async (req, res) => {
  try { // Add try...catch around database fetch
    const user = await User.findById(req.params.id, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/search", async (req, res) => {
  let { interest } = req.query; // Get the interest(s) from query parameters

  // Ensure 'interest' is an array if it's a single string
  if (interest && !Array.isArray(interest)) {
    interest = [interest];
  }

  try {
    let query = {};
    // If interests are provided, add the $in condition to the query
    if (interest && interest.length > 0) {
      query = {
        interests: { $in: interest.map(item => new RegExp(item, 'i')) } // Use $in with regex for case-insensitive matching
      };
    }
    // Note: If no interests are provided, the query will be empty,
    // effectively fetching all users (you might want to add pagination here).

    const users = await User.find(query, "-password");
    res.json(users);
  } catch (err) {
    console.error("Error searching users:", err); // Log the actual error on the backend
    res.status(500).json({ error: "Search failed" });
  }
});

// Update user profile
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Ensure the authenticated user is updating their own profile or has admin rights
    if (req.userId !== req.params.id) {
      return res.status(403).send({ message: 'You are not authorized to update this profile!' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, select: '-password' }); // {new: true} returns the updated document
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;