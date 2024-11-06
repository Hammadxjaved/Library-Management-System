const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/search', async (req, res) => {
  const books = await Book.find({ available: true });
  res.json(books);
});

router.post('/issue', async (req, res) => {
  const { title, issueDate, returnDate } = req.body;
  if (!title || !issueDate) return res.status(400).send('Book title and issue date required.');

  let book = await Book.findOne({ title });
  if (book && book.available) {
    book.available = false;
    book.issueDate = new Date(issueDate);
    book.returnDate = new Date(returnDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000));
    await book.save();
    res.json({ message: 'Book issued successfully.' });
  } else {
    res.status(404).send('Book not available.');
  }
});

router.post('/return', async (req, res) => {
  const { serialNo, returnDate } = req.body;
  let book = await Book.findOne({ serialNo });

  if (book && !book.available) {
    book.available = true;
    book.returnDate = new Date(returnDate);
    await book.save();
    res.json({ message: 'Book returned successfully.' });
  } else {
    res.status(400).send('Book not found or already available.');
  }
});

router.post('/payFine', async (req, res) => {
  const { serialNo, finePaid } = req.body;

  let book = await Book.findOne({ serialNo });
  if (book && book.returnDate < Date.now()) {
    const fine = calculateFine(book.returnDate); // Assume calculateFine is a function to calculate fine
    if (finePaid || fine === 0) {
      res.json({ message: 'Fine paid and transaction completed.' });
    } else {
      res.status(400).send('Fine must be paid to complete the transaction.');
    }
  } else {
    res.status(404).send('Book not found or fine is not due.');
  }
});


module.exports = router;
