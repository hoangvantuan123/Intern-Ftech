const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

// Middleware kiểm tra trạng thái đăng nhập
const authMiddleware = async (req, res, next) => {
  // Lấy access token từ header của yêu cầu
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }

  try {
    // Giải mã access token sử dụng secret key
    const decoded = jwt.verify(token, "your_secret_key_here");
    req.user = decoded;

    // Thực hiện thao tác kế tiếp
    next();
  } catch (e) {
    res.status(401).json({ message: "Đăng nhập đã hết hạn" });
  }
};

router.post("/", async (req, res) => {
  // Xác thực đầu vào từ người dùng
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .max(200)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Tìm người dùng theo email từ đầu vào
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Tài khoản hoặc Mật khẩu không đúng...");
  }

  // Kiểm tra mật khẩu
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return res.status(400).send("Tài khoản hoặc Mật khẩu không đúng...");
  }

  // Tạo và lưu trữ token vào trình duyệt người dùng
  const token = generateAuthToken(user);

  res.header("x-auth-token", token).send(token);
});

// API bảo vệ yêu cầu người dùng phải đăng nhập trước khi truy cập vào
router.get("/protected", authMiddleware, async (req, res) => {
  // Trả về dữ liệu có giá trị nếu mã thông báo hợp lệ
  res.send("Dữ liệu có giá trị");
});

module.exports = router;
