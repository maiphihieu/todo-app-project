import express from 'express'

const tasks = [
    { id: 1, name: 'lam bai tap ve nha nodejs', complated: false },
    { id: 2, name: 'di cho mua thuc pham cuoi tuan', complated: true },
    { id: 3, name: `Doc het chuong 5 cua sanh "cleancode"`, complated: false },
]
const app = express()

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

app.listen(3000)