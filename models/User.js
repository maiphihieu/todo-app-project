// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import thư viện mã hóa

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

module.exports = mongoose.model('User', UserSchema);