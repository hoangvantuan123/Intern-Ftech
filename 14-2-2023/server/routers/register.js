const bcrypt = require('bcrypt');
const Joi = require('Joi ');
const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(3)
            .max(30)
            .required(),
        email: Joi
            .string()
            .min(3)
            .max(200)
            .required()
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net']
                }
            }),
        password: Joi
            .string()
            .min(6)
            .max(200)
            .required()
    });
    const { error } = schema.validate(req.body)
    //Nếu như có lỗi không hợp hệ thông báo dưới dạng 400
    if (error) {
        return res
            .status(400)
            .send(error.details[0].message);
    }
    // /Nêu như người dùng nhập thêm một tải khoản gamil nếu nó có trong csdl thì Sẽ
    // đưa ra một thônng báo tài khoản đã có

    let user = await User.findOne({ email: req.body.email })
    // Thoong bao nguoi dung da co tai khoan
    if (user) {
        return res
            .status(400)
            .send("User already exist........");
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    //Bảo mật của Bcrypt 
    /// https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
    // saltRounds  càng cao thì thuật toán băm  càng mất nhiều thời gian để xử lý. > để giá trị mặc địch là 10 để cải thiện tốc độ cho người dùng.
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.error('There was an error', err);
        }
        else {
            bcrypt.hash(user.password, salt, function (err, hash) {
                // Lưu trữ hàm băm trong cơ sở dữ liệu 
                if (err) console.error('There was an error', err);
                else {
                    user.password = hash;
                    user
                        .save()
                        .then(user => {
                            res.json(user)
                        });
                }
            });
        }
    });

    await user.save()
})


module.exports = router;