import express from 'express'

const tasks = [
    { id: 1, name: 'lam bai tap ve nha nodejs', complated: false },
    { id: 2, name: 'di cho mua thuc pham cuoi tuan', complated: true },
    { id: 3, name: `Doc het chuong 5 cua sanh "cleancode"`, complated: false },
]

const app = express()
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is running on port 3000')
})
app.get('/api/v1/tasks', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            tasks: tasks
        }
    });
})

app.post('/api/v1/tasks', (req, res) => {
    const newID = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = {
        id: newID,
        name: req.body.name,
        complated: false
    };

    tasks.push(newTask);

    res.status(201).json({
        status: 'success',
        data: {
            task: newTask
        }
    });

    const { name } = req.body;

    if (!name) {
        return res
            .status(400) // 400 Bad Request - Yêu cầu không hợp lệ
            .json({ success: false, msg: 'Please provide a name for the task' });
    }
});
app.put('/api/v1/tasks/:id', (rep, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    const idToFind = parseInt(id);
    const foundTask = tasks.find(task => task.id === idToFind);
    if (!foundTask) {
        return res.status(404).json({
            success: false,
            msg: `No task with id ${taskId}` // Dùng template string cho gọn
        });
    }
    else {
        const updatedTask = {
            ...taskToUpdate, // Sao chép tất cả thuộc tính cũ
            name: name !== undefined ? name : taskToUpdate.name, // Ghi đè name nếu có
            completed: completed !== undefined ? completed : taskToUpdate.completed, // Ghi đè completed nếu có
        };
        const taskIndex = tasks.findIndex(task => task.id === idToFind);
        // Thay thế đối tượng cũ bằng đối tượng đã cập nhật
        tasks[taskIndex] = updatedTask;
        res.status(200).json({
            success: true,
            data: updatedTask
        });
    }

})

app.listen(3000)