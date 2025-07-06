// index.js (phiên bản cập nhật)
const express = require('express');
const notFound = require('./Middleware/not-found');
const errorHandlerMiddleware = require('./Middleware/error-handler');
const authRouter = require('./routes/auth');
const app = express();
// index.js
const port = process.env.PORT || 3000; // Ưu tiên cổng của môi trường production
require('dotenv').config(); // Để có thể dùng biến trong file .env
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
app.use(express.json());
app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.send('<h1>Todo App API</h1><p>Welcome!</p>');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();