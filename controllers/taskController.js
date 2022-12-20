const task = require('../models/taskSchema');
const { createCustomError }  = require('../errors/custom-errors')

const {isValidObjectId} = require('mongoose');

const getTasks = async (req,res) => {

    const allTask = await task.find({});
    res.send(allTask);  
}

const getTaskById = async (req,res,next) => {

     const {id} = req.params;

     if(!isValidObjectId(id)) return next(createCustomError('Invalid id',404))

     const taskById = await task.findOne({_id:id});

     if(!taskById) return next(createCustomError('No task with id found',404))

     res.send(taskById);
}

const addTask = async (req,res) => {

    const {title} = req.body;

    const newTask = new task({title});

    await newTask.save();

    res.send(newTask);
}

const deleteTask = async (req,res,next) => {

    const {id} = req.params;

    if(!isValidObjectId(id)) return next(createCustomError('Invalid id',404))

    const task_id =  await task.findByIdAndDelete({_id:id});

    console.log(task_id);

    if(!task_id) return next(createCustomError('No task with id found',404))

    res.send('Task Deleted Successfully');
}

const updateTask = async (req,res,next) => {

    const {id} = req.params;

    if(!isValidObjectId(id)) return next(createCustomError('Invalid id',404))

    const _task = await task.findByIdAndUpdate(id,req.body);

    if(_task) return next(createCustomError('No task with id found',404));

    res.send("Task Updated Successfully");
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getTasks,
    getTaskById
}