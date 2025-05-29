const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  username: {
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
  },
  location: {
    type: String,
  },
  interests: {
    type: String,
  },
  dreams: {
    type: String,
  },
  achievements: {
    type: String,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;