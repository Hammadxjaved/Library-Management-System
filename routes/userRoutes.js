const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add Membership
router.post('/addMembership', async (req, res) => {
  const { username, duration } = req.body;
  if (!username || !duration) return res.status(400).send('All fields are mandatory.');

  const user = await User.findOne({ username });
  if (user) {
    user.membership = duration;
    await user.save();
    res.json({ message: 'Membership added successfully.' });
  } else {
    res.status(404).send('User not found.');
  }
});

// Update Membership
router.post('/updateMembership', async (req, res) => {
  const { membershipNumber, extension } = req.body;
  if (!membershipNumber) return res.status(400).send('Membership Number is required.');

  const user = await User.findOne({ membershipNumber });
  if (user) {
    user.membership = extension || '6 months';
    await user.save();
    res.json({ message: 'Membership updated successfully.' });
  } else {
    res.status(404).send('User not found.');
  }
});


router.post('/addUser', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).send('All fields are required.');
  
    const hash = bcrypt.hashSync(password, 8);
    const user = new User({ username, password: hash, role });
    await user.save();
    res.json({ message: 'User added successfully.' });
  });
  
  router.post('/updateUser', async (req, res) => {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username });
  
    if (user) {
      if (password) user.password = bcrypt.hashSync(password, 8);
      if (role) user.role = role;
      await user.save();
      res.json({ message: 'User updated successfully.' });
    } else {
      res.status(404).send('User not found.');
    }
  });
  
module.exports = router;
