const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {


    /* 1: xac thuc */
    const schema = Joi.object({
        email:
            Joi.string().min(3).max(200).required().email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net']
                }
            }),
        password:
            Joi.string().min(6).max(200).required(),
    });


    /* 2: Kiem tra tai khoan nguoi dung co ton tai khong  */
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);

    }
    
    let user = await User.findOne({ email: req.body.email });
    // kiểm tra tài khoản người dùng có tồn tại không 
    if (!user) return res.status(400).send("Tài khoản hoặc Mật khẩu không đúng...");


    /* 3: xac thuc tai khoan  mat khau cua nguoi dung */
    /// sử dụng bcrypt và một compare để so sanh mật khẩu  đc nhập vào
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).send("Tài khoản hoặc Mật khẩu không đúng...");

    /* Tao ma thong bao */
    const token = generateAuthToken(user);

    res.send(token);
});

module.exports = router;
