// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import thư viện mã hóa
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        // Dùng regex để kiểm tra định dạng email
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        unique: true, // Đảm bảo mỗi email là duy nhất trong database
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
});

// Mongoose Middleware: Chạy trước khi lưu ('save')
// Dùng để mã hóa mật khẩu trước khi lưu vào database
UserSchema.pre('save', async function() {
    // 'this' trỏ đến document (user) đang được tạo
    const salt = await bcrypt.genSalt(10); // Tạo một chuỗi ngẫu nhiên để "rắc muối"
    this.password = await bcrypt.hash(this.password, salt); // Băm mật khẩu với "muối"
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name }, // Dữ liệu muốn đưa vào token
        process.env.JWT_SECRET, // Chìa khóa bí mật
        { expiresIn: process.env.JWT_LIFETIME } // Thời gian hết hạn
    );
};

// models/User.js
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

// models/User.js


module.exports = mongoose.model('User', UserSchema);