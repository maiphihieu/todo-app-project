// index.js

const express = require('express');
const app = express();
const port = 3000;

const tasksRouter = require('./routes/tasks');

// Middleware để "phiên dịch" JSON mà client gửi lên
app.use(express.json());

// Route chào mừng để kiểm tra server có chạy không
app.get('/', (req, res) => {
    res.send('<h1>Todo App API</h1><p>Welcome!</p>');
});

// Gắn "bảng chỉ đường" tasks vào địa chỉ gốc /api/v1/tasks
app.use('/api/v1/tasks', tasksRouter);

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});