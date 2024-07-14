// server/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.post('/update-location', async (req, res) => {
  const { latitude, longitude } = req.body;
  const location = new Location({ latitude, longitude, timestamp: new Date() });
  await location.save();
  res.send({ success: true });
});

module.exports = router;
