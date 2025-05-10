const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { // This is the second definition, keep this
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;