/**
 * In-memory task service for managing tasks.
 * @module task.services
 */
let tasks = [];
let currentId = 1;
module.exports = {
    /**
     * Retrieves all tasks.
     * @function
     * @returns {Array<Object>} Array of task objects.
     */
    getAll: () => {
        try {
            return tasks;
        } catch (error) {
            console.error('Error in getAll:', error);
            return [];
        }
    },
    /**
     * Creates a new task.
     * @function
     * @param {Object} data - The data for the new task.
     * @returns {Object|null} The created task object, or null if creation failed.
     */
    create: (data) => {
        try {
            const task = { id: currentId++, ...data };
            tasks.push(task);
            return task;
        } catch (error) {
            console.error('Error in create:', error);
            return null;
        }
    },
    /**
     * Updates an existing task by ID.
     * @function
     * @param {number|string} id - The ID of the task to update.
     * @param {Object} data - The new data for the task.
     * @returns {Object|null} The updated task object, or null if not found or update failed.
     */
    update: (id, data) => {
        try {
            const index = tasks.findIndex(t => t.id === parseInt(id));
            if (index === -1) return null;
            tasks[index] = { id: parseInt(id), ...data };
            return tasks[index];
        } catch (error) {
            console.error('Error in update:', error);
            return null;
        }
    },
    /**
     * Deletes a task by ID.
     * @function
     * @param {number|string} id - The ID of the task to delete.
     * @returns {boolean} True if the task was deleted, false otherwise.
     */
    delete: (id) => {
        try {
            const index = tasks.findIndex(t => t.id === parseInt(id));
            if (index === -1) return false;
            tasks.splice(index, 1);
            return true;
        } catch (error) {
            console.error('Error in delete:', error);
            return false;
        }
    }
};