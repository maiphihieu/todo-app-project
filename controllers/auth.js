const User = require('../models/User');

const register = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(201).json({ user: { name: user.name }, token });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please provide email and password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const token = user.createJWT();
        res.status(200).json({ user: { name: user.name }, token });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };