// public/browser-app.js

const tasksDOM = document.querySelector('.tasks-container');

// =================================================================
// BƯỚC QUAN TRỌNG: Lấy token và dán vào đây để test
// 1. Dùng Postman, đăng nhập với một user của em để lấy token.
// 2. Copy chuỗi token đó.
// 3. Dán vào vị trí 'YOUR_TOKEN_HERE'.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY4MDE3ZGU3YzZjODZjZGU0ZGEzN2QiLCJuYW1lIjoiVXNlciBBIiwiaWF0IjoxNzUxNzcwOTcxLCJleHAiOjE3NTQzNjI5NzF9.YlvYLMX0uqt0O2hgminOhcn0gHDtb5UucQSUyHP0kbM';
// =================================================================

// Hàm để lấy và hiển thị tất cả tasks
const showTasks = async () => {
    try {
        // Gọi API GET /tasks, nhớ đính kèm token
        const response = await fetch('/api/v1/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const { success, data: tasks } = await response.json();

        if (!success || tasks.length < 1) {
            tasksDOM.innerHTML = '<h5>No tasks in your list</h5>';
            return;
        }

        // Nếu có tasks, tạo ra các thẻ HTML để hiển thị
        const allTasks = tasks.map((task) => {
            const { completed, _id: taskID, name } = task;
            return `<div class="single-task">
                        <h5>${name}</h5>
                    </div>`;
        }).join('');

        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        tasksDOM.innerHTML = '<h5>There was an error, please try again later</h5>';
        console.log(error);
    }
};

showTasks();