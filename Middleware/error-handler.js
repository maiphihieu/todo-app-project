// middleware/error-handler.js
const errorHandlerMiddleware = (err, req, res, next) => {
    // Log lỗi ra để debug trong quá trình phát triển
    console.error(err); 

    // Tùy chỉnh response dựa vào loại lỗi
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(item => item.message).join(', ');
        return res.status(400).json({ msg: `Validation Error: ${messages}` });
    }

    // Nếu không phải lỗi cụ thể nào, trả về lỗi 500 chung
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
}

module.exports = errorHandlerMiddleware;