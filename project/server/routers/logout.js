const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware kiểm tra trạng thái đăng nhập
const authMiddleware = async (req, res, next) => {
  // Lấy access token từ header của yêu cầu
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
  }

  try {
    // Giải mã access token sử dụng secret key
    const decoded = jwt.verify(token, 'your_secret_key_here');
    req.user = decoded;

    // Thực hiện thao tác kế tiếp
    next();
  } catch (e) {
    res.status(401).json({ message: 'Đăng nhập đã hết hạn' });
  }
};

router.delete('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const newMessages = req.user.newMessages;

    // Cập nhật thông tin đăng nhập và những thông báo mới nhất cho người dùng sau khi đăng xuất
    await User.findByIdAndUpdate(userId, { isLoggedIn: false, lastLogout: Date.now(), newMessages: newMessages });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
