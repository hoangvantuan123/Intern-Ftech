const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');
const User = require('../models/user');

// http://localhost:5000/register
router.post('/register', (req, res) => {
    const { error, isValid } = validateRegister(req.body);

    if (!isValid) {
        return res.state(400).json(error);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {

            return res.state(400).json({
                email: ' Email nay da dang ky!!'
            });
        } else {
            const profile = gravatar.url(req.body.email, {
                s: 200, // size
                r: 'pg', // ratings
                d: 'mm', // default
            });
            const newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profile,
            });

            //Bảo mật của Bcrypt 
            /// https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
            // saltRounds  càng cao thì thuật toán băm  càng mất nhiều thời gian để xử lý. > để giá trị mặc địch là 10 để cải thiện tốc độ cho người dùng.
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.error('There was an error', err);
                }
                else {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        // Lưu trữ hàm băm trong cơ sở dữ liệu 
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });

        }
    });
});



router.post('/login', (req, res) => {
    const { error, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.state(400).json(error);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                error.email = 'invalid email and password!'
                return res.status(404).json(error);
            }
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        error.password = 'Mật khẩu không đúng';
                        return res.status(400).json(error);
                    }
                });
        });
});


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;