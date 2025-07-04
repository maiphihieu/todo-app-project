// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'must provide a name'],
            trim: true,
            maxlength: [50, 'name can not be more than 20 characters']
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User', // Tham chiếu đến Model 'User'
            required: [true, 'Please provide user'],
        },
    },
{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);