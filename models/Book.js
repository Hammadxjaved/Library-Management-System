const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  available: { type: Boolean, default: true },
  issueDate: Date,
  returnDate: Date,
  serialNo: String
});

module.exports = mongoose.model('Book', bookSchema);
