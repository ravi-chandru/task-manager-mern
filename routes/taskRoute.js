const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');
const task = require('../models/taskSchema');
const {titleValidator,validate} = require('../utilities/validator');

taskRouter.route('/').get(taskController.getTasks).post(titleValidator,validate,taskController.addTask);

taskRouter.route('/:id').get(taskController.getTaskById).patch(taskController.updateTask).delete(taskController.deleteTask);

module.exports = taskRouter;