import express from 'express';
import tasksRouter from './routes/tasks.js';

const app = express();
const port = 3000;

app.use(express.json());

// Dòng này phải chính xác, không có tham số hay dấu hai chấm thừa
app.use('/api/v1/tasks', tasksRouter); 

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});