const validator = require('validator');
const isEmpty = require('./isEmpty');

// Dùng một một thư viện trình xác thực chuỗi 
// để kiểm tra các giá tị đầu vào và dựa trên các giá trị đó, nếu như các giá trị trống hoặc không được xác định đúng với độ dài trong điều kiện được đặt ra
// thì nó sẽ gửi ra một thông báo lỗi cho phía client

module.exports = function validateRegister(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Tên phải từ 2 đến 30 ký tự!';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Tên là bắt buộc!';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email không hợp lệ!';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email là bắt buộc!';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Mật khẩu phải có 6 ký tự';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Mật khẩu là bắt buộc!';
    }

    if (!validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
        errors.password_confirm = 'Mật khẩu phải có 6 đến 30 ký tự';
    }

    if (!validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Xác nhận mật khẩu không khớp!';
    }

    if (validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Mật khẩu là bắt buộc!';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}