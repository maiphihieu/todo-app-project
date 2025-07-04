// middleware/authentication.js
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // 1. Kiểm tra header 'Authorization'
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Nếu không có header hoặc không đúng định dạng 'Bearer ', báo lỗi
        return res.status(401).json({ msg: 'Authentication invalid' });
    }

    // 2. Tách lấy token
    const token = authHeader.split(' ')[1]; // Lấy phần đằng sau 'Bearer '

    try {
        // 3. Dùng jwt.verify để giải mã token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Gắn thông tin user vào đối tượng request
        // payload sẽ có dạng { userId: '...', name: '...' } như lúc ta tạo
        req.user = { userId: payload.userId, name: payload.name };

        // 5. Chuyển sang middleware hoặc controller tiếp theo
        next();
    } catch (error) {
        // Nếu token không hợp lệ (sai, hết hạn...), jwt.verify sẽ ném lỗi
        return res.status(401).json({ msg: 'Authentication invalid' });
    }
};

module.exports = authMiddleware;