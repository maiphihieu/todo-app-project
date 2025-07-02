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

module.exports = { register };