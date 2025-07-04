const Task = require('../models/Task');

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.userId }).sort('createdAt');
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId;
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

const getTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { userId } = req.user;
        const task = await Task.findOne({ _id: taskId, createdBy: userId });
        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { userId } = req.user;
        const task = await Task.findOneAndUpdate(
            { _id: taskId, createdBy: userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const { userId } = req.user;
        const task = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });
        if (!task) {
            return res.status(404).json({ success: false, msg: `No task with id: ${taskId}` });
        }
        res.status(200).json({ success: true, msg: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };