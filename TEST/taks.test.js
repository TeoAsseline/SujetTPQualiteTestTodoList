// tests/task.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../ROUTES/task.routes');

// Simuler l'application Express avec les routes
const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

describe('Task API', () => {
  let createdTaskId;

  it('devrait créer une nouvelle tâche', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Tâche de test', completed: false });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Tâche de test');
    expect(res.body.completed).toBe(false);

    createdTaskId = res.body.id;
  });

  it('devrait récupérer toutes les tâches', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('devrait mettre à jour une tâche', async () => {
    const res = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send({ title: 'Tâche mise à jour', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Tâche mise à jour');
    expect(res.body.completed).toBe(true);
  });

  it('devrait supprimer une tâche', async () => {
    const res = await request(app).delete(`/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Task deleted successfully' });
  });

  it('devrait retourner une erreur si la tâche n\'existe pas', async () => {
    const res = await request(app).delete('/tasks/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not found');
  });
});
