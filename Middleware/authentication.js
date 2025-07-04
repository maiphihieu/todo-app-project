const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authentication invalid, no token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Gắn user vào request
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Authentication invalid, token is invalid' });
    }
};

module.exports = authMiddleware;