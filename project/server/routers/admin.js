const express = require("express");
const mongoose = require('mongoose');
const http = require('http'); // import http module
const socketIO = require('socket.io'); // import socket.io module
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const User = require('../models/user');
const Post = require('../models/post');



AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        logo: '',
        companyName: 'Admin',
    },

})

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'admin',
}

const app = express();
const server = http.createServer(app); // tạo server từ express app

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN
        }
        return null
    }
})

const io = socketIO(server); // sử dụng server để khởi tạo socket.io

router.use((req, res, next) => {
  req.io = io;
  next();
});

// handle form login
router.route('/')
  .get((req, res) => {
    res.send('Admin Login');
  })
  .post((req, res) => {
    const { email, password } = req.body; // lấy thông tin từ form
    if (email === ADMIN.email && password === ADMIN.password) {
      res.send('Admin Login Success'); // xử lý đăng nhập thành công
    } else {
      res.send('Admin Login Failed'); // xử lý đăng nhập thất bại
    }
  });


module.exports = router;
