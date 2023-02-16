const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogin(data) {
    let error = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isEmail(data.email)) {
        error.email = " Email này không hợp lệ! ";
    }
    if (validator.isEmpty(data.email)) {
        error.email = "Email là bắt buộc!";
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        error.password = 'Mật khẩu phải có 6 ký tự';
    }
    if (validator.isEmpty(data.password)) {
        error.password = 'Mật khẩu là bắt buộc!';
    }
    return{
        error,
        isValid: isEmpty(error)
    }
}