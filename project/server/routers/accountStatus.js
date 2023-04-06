const bcrypt = require("bcrypt");
const express = require("express");
const { User } = require('../models/user')
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const isLoggedIn = req.session.userId ? true : false;

        // Nếu người dùng đã đăng nhập, trả về thời gian đăng nhập và id của người dùng
        if (isLoggedIn) {
            const user = await User.findById(req.session.userId);
            res.send({ isLoggedIn: true, loginTime: user.lastLogin, _id: user._id });
        } else {
            res.send({ isLoggedIn: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})


module.exports = router;
