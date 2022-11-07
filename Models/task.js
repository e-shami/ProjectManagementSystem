var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    dueDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);