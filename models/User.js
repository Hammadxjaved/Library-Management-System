const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['Admin', 'User'], required: true },
  membership: { type: String, enum: ['6 months', '1 year', '2 years'], default: '6 months' }
});

module.exports = mongoose.model('User', userSchema);
