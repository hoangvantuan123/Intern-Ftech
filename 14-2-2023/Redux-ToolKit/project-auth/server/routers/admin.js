const express = require("express");
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const path = require('path');
const mongoose = require('mongoose');
const app = express();
//const mongooseDb = await mongoose.connect('mongodb://localhost:27017/test')


AdminBro.registerAdapter(AdminBroMongoose)
app.use(express.static(path.join(__dirname, "../public")));

const adminBro = new AdminBro({

    databases: [mongoose],
    /* resources: [{
    }], */
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

module.exports = router