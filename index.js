import express from 'express'

let tasks = [
    { id: 1, name: 'lam bai tap ve nha nodejs', completed: false },
    { id: 2, name: 'di cho mua thuc pham cuoi tuan', completed: true },
    { id: 3, name: `Doc het chuong 5 cua sanh "cleancode"`, completed: false },
]

const app = express()
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is running on port 3000')
})
//Read
app.get('/api/v1/tasks', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            tasks: tasks
        }
    });
})
//Create
app.post('/api/v1/tasks', (req, res) => {
    // TƯ DUY: Bước 1 - Kiểm tra xem dữ liệu gửi lên có hợp lệ không?
    const { name } = req.body;
    if (!name) {
        // Nếu không có 'name', dừng lại và báo lỗi ngay lập tức.
        return res
            .status(400) // 400 Bad Request
            .json({ success: false, msg: 'Please provide a name for the task' });
    }

    // TƯ DUY: Bước 2 - Nếu dữ liệu hợp lệ, mới bắt đầu xử lý tạo mới.
    const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
        id: newID,
        name: name, // Dùng biến 'name' đã lấy ra ở trên
        completed: false // Đã sửa lỗi chính tả
    };
    tasks.push(newTask);

    // TƯ DUY: Bước 3 - Gửi phản hồi thành công.
    res.status(201).json({
        status: 'success',
        data: {
            task: newTask
        }
    });
});
//Update
app.put('/api/v1/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    const idToFind = parseInt(id);

    // Em đã tìm task ở đây, rất tốt!
    const foundTask = tasks.find(task => task.id === idToFind);

    if (!foundTask) {
        return res.status(404).json({
            success: false,
            msg: `No task with id ${idToFind}`
        });
    }
    else {
        const updatedTask = {

            ...foundTask,
            name: name !== undefined ? name : foundTask.name,
            completed: completed !== undefined ? completed : foundTask.completed,
        };

        const taskIndex = tasks.findIndex(task => task.id === idToFind);

        tasks[taskIndex] = updatedTask;

        res.status(200).json({
            success: true,
            data: updatedTask
        });
    }
})

//delete
app.delete('/api/v1/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskID = parseInt(id);
    const originalLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskID);

    // Nếu độ dài mảng không đổi, nghĩa là không có task nào được xóa
    if (tasks.length === originalLength) {
        return res.status(404).json({
            success: false,
            msg: `No task with id ${taskID}`
        });
    }

    res.status(200).json({
        success: true,
        msg: 'Task deleted successfully'
    });
});
app.listen(3000)