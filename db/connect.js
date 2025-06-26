// db/connect.js
const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url);
};
console.log("connect thành công")

module.exports = connectDB;