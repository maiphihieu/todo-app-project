import express from 'express'

let tasks = [
    { id: 1, name: 'lam bai tap ve nha nodejs', complated: false },
    { id: 2, name: 'di cho mua thuc pham cuoi tuan', complated: true },
    { id: 3, name: `Doc het chuong 5 cua sanh "cleancode"`, complated: false },
]

const app = express()
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is running on port 3000')
})
//create
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
//put
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
    const taskToDelete = tasks.find(task => task.id === taskID);
    if (!taskToDelete) {
        return res.status(404).json({
            success: false,
            msg: `No task with id ${taskID}`
        });
    }
    tasks = tasks.filter(task => task.id !== taskID);
    res.status(200).json({
        success: true,
        msg: 'Task deleted successfully'
    });
})
app.listen(3000)