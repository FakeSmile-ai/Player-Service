// src/config/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Players Service API',
      version: '1.0.0',
      description: 'Microservicio para la gestión de jugadores.',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desarrollo'
      }
    ],
    // --- NUEVAS SECCIONES ---
    tags: [
      {
        name: 'Players',
        description: 'API para la gestión de jugadores'
      }
    ],
    components: {
      schemas: {
        Player: {
          type: 'object',
          required: ['name', 'age'],
          properties: {
            id: {
              type: 'integer',
              description: 'El ID autogenerado del jugador.',
            },
            name: {
              type: 'string',
              description: 'El nombre del jugador.',
            },
            age: {
              type: 'integer',
              description: 'La edad del jugador.',
            },
            position: {
              type: 'string',
              description: 'La posición del jugador.',
            },
          },
          example: {
            id: 1,
            name: "Cristiano Ronaldo",
            age: 39,
            position: "Delantero"
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Documentación de la API disponible en http://localhost:3001/api-docs');
};

module.exports = setupSwagger;