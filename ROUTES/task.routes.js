const express = require('express');
const router = express.Router();
const controller = require('../CONTROLLER/task.controller');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Récupère toutes les tâches
 *     tags: [Tâches]
 *     responses:
 *       200:
 *         description: Liste des tâches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   completed:
 *                     type: boolean
 */
router.get('/', controller.getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crée une nouvelle tâche
 *     tags: [Tâches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, completed]
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tâche créée avec succès
 */
router.post('/', controller.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Met à jour une tâche
 *     tags: [Tâches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, completed]
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tâche mise à jour
 */
router.put('/:id', controller.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Supprime une tâche
 *     tags: [Tâches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tâche supprimée
 */
router.delete('/:id', controller.deleteTask);

module.exports = router;