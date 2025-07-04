// routes/tasks.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authentication');

// Nhập các "đầu bếp" từ controller
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks');
router.use(authMiddleware);
// Định nghĩa các con đường và giao nhiệm vụ cho đầu bếp tương ứng
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

// Xuất khẩu bảng chỉ đường này ra ngoài
module.exports = router;