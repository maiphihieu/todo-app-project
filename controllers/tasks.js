// Dữ liệu giả được chuyển vào đây để controller quản lý
// Trong file controllers/tasks.js

let tasks = [
    // Sửa 'complated' thành 'completed'
    { id: 1, name: 'Làm bài tập về nhà môn NodeJS', completed: false },
    { id: 2, name: 'Đi chợ mua thực phẩm cho cuối tuần', completed: true },
    { id: 3, name: 'Đọc hết chương 5 của sách "Clean Code"', completed: false },
];

// READ - Lấy tất cả tasks
export const getAllTasks = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            tasks: tasks
        }
    });
};

// CREATE - Tạo một task mới
export const createTask = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'Please provide a name for the task' });
    }
    const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
        id: newID,
        name: name,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json({
        status: 'success',
        data: {
            task: newTask
        }
    });
};

// UPDATE - Cập nhật một task
export const updateTask = (req, res) => {
    const { id } = req.params;
    const taskId = parseInt(id);
    const taskToUpdate = tasks.find(task => task.id === taskId);

    if (!taskToUpdate) {
        return res.status(404).json({
            success: false,
            msg: `No task with id ${taskId}`
        });
    }

    const updatedTask = {
        ...taskToUpdate,
        name: req.body.name || taskToUpdate.name,
        completed: req.body.completed !== undefined ? req.body.completed : taskToUpdate.completed,
    };
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks[taskIndex] = updatedTask;

    res.status(200).json({
        success: true,
        data: updatedTask
    });
};

// DELETE - Xóa một task
export const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskId = parseInt(id);
    const taskToDelete = tasks.find(task => task.id === taskId);

    if (!taskToDelete) {
        return res.status(404).json({
            success: false,
            msg: `No task with id ${taskId}`
        });
    }

    tasks = tasks.filter(task => task.id !== taskId);
    res.status(200).json({
        success: true,
        msg: 'Task deleted successfully'
    });
};

// Lưu ý: Hiện tại chúng ta chưa có endpoint GET một task, nhưng nếu có, nó sẽ ở đây.