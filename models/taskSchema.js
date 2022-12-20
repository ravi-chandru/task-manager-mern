const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true,
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const task = mongoose.model('tasks',taskSchema);

module.exports = task;