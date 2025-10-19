// src/routes/playerRoutes.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { validateCreatePlayer, validateUpdatePlayer } = require('../middlewares/validationMiddleware');

/**
 * @swagger
 * /api/players:
 * get:
 * summary: Retorna la lista de todos los jugadores
 * tags: [Players]
 * responses:
 * '200':
 * description: La lista de jugadores
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Player'
 */
router.get('/', playerController.getAllPlayers);

/**
 * @swagger
 * /api/players/{id}:
 * get:
 * summary: Obtiene un jugador por su ID
 * tags: [Players]
 * parameters:
 * - name: id
 * in: path
 * required: true
 * description: El ID del jugador
 * schema:
 * type: integer
 * responses:
 * '200':
 * description: Los datos del jugador
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Player'
 * '404':
 * description: El jugador no fue encontrado
 */
router.get('/:id', playerController.getPlayerById);

/**
 * @swagger
 * /api/players:
 * post:
 * summary: Crea un nuevo jugador
 * tags: [Players]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Player'
 * responses:
 * '201':
 * description: El jugador fue creado exitosamente
 * '400':
 * description: Datos de entrada inválidos
 */
router.post('/', validateCreatePlayer, playerController.createPlayer);

/**
 * @swagger
 * /api/players/{id}:
 * put:
 * summary: Actualiza un jugador existente
 * tags: [Players]
 * parameters:
 * - name: id
 * in: path
 * required: true
 * description: El ID del jugador
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Player'
 * responses:
 * '200':
 * description: Jugador actualizado
 * '404':
 * description: El jugador no fue encontrado
 * '400':
 * description: Datos de entrada inválidos
 */
router.put('/:id', validateUpdatePlayer, playerController.updatePlayer);

/**
 * @swagger
 * /api/players/{id}:
 * delete:
 * summary: Elimina un jugador por su ID
 * tags: [Players]
 * parameters:
 * - name: id
 * in: path
 * required: true
 * description: El ID del jugador
 * schema:
 * type: integer
 * responses:
 * '200':
 * description: Jugador eliminado
 * '404':
 * description: El jugador no fue encontrado
 */
router.delete('/:id', playerController.deletePlayer);

module.exports = router;