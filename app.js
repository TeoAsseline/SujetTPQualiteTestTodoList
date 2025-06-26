const express = require('express');
const taskRoutes = require('./ROUTES/task.routes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./DOCS/swagger');

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
