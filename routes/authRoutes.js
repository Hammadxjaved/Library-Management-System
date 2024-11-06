const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (user && bcrypt.compareSync(password, user.password)) {
    res.redirect('/dashboard');
  } else {
    res.status(400).send('Invalid credentials');
  }
});

module.exports = router;
