// controllers/tasks.js

const Task = require('../models/Task');

// READ ALL - Lấy tất cả tasks
const getAllTasks = async (req, res, next) => {
    try {
        const { completed, name, sort, fields, } = req.query;
        const queryObject = {};

        if (completed) {
            queryObject.completed = (completed === 'true');
        }

        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }

        let result = Task.find(queryObject); // Bắt đầu xây dựng chuỗi truy vấn, chưa dùng await vội

        // Logic sắp xếp
        if (sort) {
            // Mongoose cần các trường sort cách nhau bởi dấu cách, không phải dấu phẩy
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        } else {
            // Mặc định sắp xếp theo thời gian tạo (nếu không có yêu cầu)
            // MongoDB sẽ tự có trường createdAt khi tạo document
            result = result.sort('createdAt');
        }

        if (fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList);
        }

        // ... ngay sau khối if (fields)

        // Logic phân trang
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10; // Đặt số lượng mặc định là 10
        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);

        const tasks = await result;
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        next(error);
    }
};

// CREATE - Tạo một task mới
const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

// READ ONE - Lấy một task theo ID
const getTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOne({ _id: taskId });

        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

// UPDATE - Cập nhật một task theo ID (PHIÊN BẢN SỬA LẠI)
const updateTask = async (req, res, next) => {
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
        next(error);
    }
};

// DELETE - Xóa một task theo ID (PHIÊN BẢN SỬA LẠI)
const deleteTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        // Dùng findOneAndDelete để tìm và xóa trong 1 lệnh
        const task = await Task.findOneAndDelete({ _id: taskId });

        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }

        res.status(200).json({ success: true, msg: 'Task deleted successfully' });
    } catch (error) {
        next(error);
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