const express = require('express');
const  Message  = require('../models/Message');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
module.exports = router;