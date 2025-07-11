const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  favorites: [Object]
});

module.exports = mongoose.model('User', userSchema);