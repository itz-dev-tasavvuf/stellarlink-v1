
const express = require('express');
const mongoose = require('mongoose');

// Import authentication routes
const authRoutes = require('./routes/auth');
console.log("authRoutes imported:", authRoutes);
const userRoutes = require('./routes/userRoutes');
console.log("userRoutes imported:", userRoutes);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/stellarlink', {

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(express.json()); // This should be before route definitions that need JSON body
console.log("express.json() middleware added");

// Basic route to test if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Mount authentication routes
app.use('/auth', authRoutes); // Mount auth routes
console.log("/auth routes mounted");

// Mount user routes
app.use('/api/users', userRoutes); // Mount user routes
console.log("/api/users routes mounted");

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ message: 'Something went wrong on the server.' });
  }
  next(err); // Pass to default Express error handler for non-API requests
});
