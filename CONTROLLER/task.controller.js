const Task = require('../SERVICES/task.services');
/**
 * Controller for creating a new task.
 * @function
 * @param {import('express').Request} req - Express request object containing task data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
exports.createTask = (req, res) => {
    try {
        const task = Task.create(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/**
 * Controller for retrieving all tasks.
 * @function
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
exports.getAllTasks = (req, res) => {
    try {
        res.json(Task.getAll());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/**
 * Controller for updating a task by ID.
 * @function
 * @param {import('express').Request} req - Express request object containing task ID in params and updated data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
exports.updateTask = (req, res) => {
    try {
        const updated = Task.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/**
 * Controller for deleting a task by ID.
 * @function
 * @param {import('express').Request} req - Express request object containing task ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
exports.deleteTask = (req, res) => {
    try {
        const deleted = Task.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};