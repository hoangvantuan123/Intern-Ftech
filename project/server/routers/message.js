const express = require('express');
const { Message } = require('../models/chat');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, text } = req.body;
    const message = new Message({ userId, text });
    await message.save();
    res.json(message);
});

router.get('/', async (req, res) => {
    const messages = await Message.find().populate('userId');
    res.json(messages);
});

module.exports = router;