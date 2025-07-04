// controllers/auth.js
const User = require('../models/User'); // Import User model

const register = async (req, res, next) => {
    try {
        // Logic sẽ được thêm vào đây
        const user = await User.create({ ...req.body });
        res.status(201).json({ user: { name: user.name } });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Kiểm tra xem người dùng có nhập email và password không
        if (!email || !password) {
            // Chỗ này sau sẽ được thay thế bằng Custom Error
            return res.status(400).json({ msg: 'Please provide email and password' });
        }

        // 2. Tìm người dùng trong database bằng email
        const user = await User.findOne({ email });

        // 3. Nếu không tìm thấy user, báo lỗi
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Credentials' }); // 401 Unauthorized
        }

        // 4. So sánh mật khẩu
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        // 5. Nếu mọi thứ đều đúng, tạo token
        const token = user.createJWT();

        // 6. Trả về token cho người dùng
        res.status(200).json({ user: { name: user.name }, token });

    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };