import express from 'express';
const router = express.Router();

// Import các function từ controller
import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasks.js';

// Định nghĩa các đường dẫn
// !!! SỬA LẠI ĐƯỜNG DẪN Ở ĐÂY !!!
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

export default router;