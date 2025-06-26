// === FILE: docs/swagger.js ===
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'ToDo API', version: '1.0.0' },
  },
  apis: ['./ROUTES/*.js'],
};

module.exports = swaggerJSDoc(options);