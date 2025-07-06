// public/browser-app.js
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const tasksDOM = document.querySelector('.tasks-container');

// =================================================================
// BƯỚC QUAN TRỌNG: Lấy token và dán vào đây để test
// 1. Dùng Postman, đăng nhập với một user của em để lấy token.
// 2. Copy chuỗi token đó.
// 3. Dán vào vị trí 'YOUR_TOKEN_HERE'.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZhNDFkNmU0N2ZjNjVkYjBhNzY0ZWYiLCJuYW1lIjoiSGlldSBNYWkiLCJpYXQiOjE3NTE3OTQxMzQsImV4cCI6MTc1NDM4NjEzNH0.BTWzHXdEV3lmyscLD7vHTFdHlSnRBgSfsCR823kAUfY';
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
        // Bên trong hàm showTasks
        const allTasks = tasks.map((task) => {
            const { completed, _id: taskID, name } = task;
            return `<div class="single-task ${completed && 'task-completed'}">
                <h5><span>${name}</span></h5>
                <button type="button" class="delete-btn" data-id="${taskID}">
                    Delete
                </button>
            </div>`;
        }).join('');

        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        tasksDOM.innerHTML = '<h5>There was an error, please try again later</h5>';
        console.log(error);
    }
};
// Xử lý form submit
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang

    const name = taskInputDOM.value; // Lấy giá trị từ ô input

    try {
        // Gọi API POST /tasks
        await fetch('/api/v1/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Báo cho server biết ta gửi JSON
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name }), // Chuyển object JS thành chuỗi JSON
        });

        // Sau khi tạo thành công, gọi lại showTasks() để làm mới danh sách
        showTasks();
        taskInputDOM.value = ''; // Xóa chữ trong ô input

    } catch (error) {
        console.log(error);
        // Có thể thêm code để hiển thị lỗi cho người dùng ở đây
    }
});

// Xử lý sự kiện click để xóa
tasksDOM.addEventListener('click', async (e) => {
    const el = e.target; // Lấy về phần tử đã được click

    // Kiểm tra xem phần tử đó có phải là nút 'delete-btn' không
    if (el.classList.contains('delete-btn')) {
        const id = el.dataset.id; // Lấy id từ thuộc tính data-id
        try {
            // Gọi API DELETE /tasks/:id
            await fetch(`/api/v1/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Tải lại danh sách sau khi xóa thành công
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
});
showTasks();