// controllers/tasks.js

// Dữ liệu giả của chúng ta, do controller quản lý
let tasks = [
    { id: 1, name: 'Học NodeJS cơ bản', completed: false },
    { id: 2, name: 'Hoàn thành Tái cấu trúc Code', completed: true },
    { id: 3, name: 'Chuẩn bị cho việc kết nối Database', completed: false },
];

// READ ALL - Lấy tất cả tasks
const getAllTasks = (req, res) => {
    res.status(200).json({ success: true, data: tasks });
};

// CREATE - Tạo một task mới
const createTask = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide a name' });
    }
    const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id: newID, name: name, completed: false };
    tasks.push(newTask);
    res.status(201).json({ success: true, data: newTask });
};

// READ ONE - Lấy một task theo ID
const getTask = (req, res) => {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === Number(id));
    if (!task) {
        return res.status(404).json({ success: false, msg: `No task with id: ${id}` });
    }
    res.status(200).json({ success: true, data: task });
};

// UPDATE - Cập nhật một task theo ID
const updateTask = (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;

    const taskToUpdate = tasks.find((t) => t.id === Number(id));
    if (!taskToUpdate) {
        return res.status(404).json({ success: false, msg: `No task with id: ${id}` });
    }
    // Cập nhật các trường nếu chúng tồn tại trong request body
    taskToUpdate.name = name !== undefined ? name : taskToUpdate.name;
    taskToUpdate.completed = completed !== undefined ? completed : taskToUpdate.completed;

    res.status(200).json({ success: true, data: taskToUpdate });
};

// DELETE - Xóa một task theo ID
const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskToDelete = tasks.find((t) => t.id === Number(id));

    if (!taskToDelete) {
        return res.status(404).json({ success: false, msg: `No task with id: ${id}` });
    }
    // Tạo ra mảng mới không chứa task bị xóa
    tasks = tasks.filter((t) => t.id !== Number(id));

    res.status(200).json({ success: true, msg: 'Task deleted successfully' });
};

// Xuất khẩu tất cả các function để router có thể dùng
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};