// controllers/tasks.js

const Task = require('../models/Task');

// READ ALL - Lấy tất cả tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};

// CREATE - Tạo một task mới
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};

// READ ONE - Lấy một task theo ID
const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOne({ _id: taskId });

        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};

// UPDATE - Cập nhật một task theo ID (PHIÊN BẢN SỬA LẠI)
const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        // Dùng findOneAndUpdate để tìm và sửa trong 1 lệnh
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true, // Trả về document mới sau khi đã cập nhật
            runValidators: true, // Áp dụng các quy tắc validation trong Schema
        });

        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};

// DELETE - Xóa một task theo ID (PHIÊN BẢN SỬA LẠI)
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        // Dùng findOneAndDelete để tìm và xóa trong 1 lệnh
        const task = await Task.findOneAndDelete({ _id: taskId });

        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }

        res.status(200).json({ success: true, msg: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};

// Xuất khẩu tất cả các function đã được nâng cấp
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};