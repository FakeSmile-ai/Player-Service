// src/controllers/playerController.js

const playerService = require('../services/playerService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.getAllPlayers = async (req, res, next) => {
  try {
    const players = await playerService.getAllPlayers();
    successResponse(res, 'Jugadores obtenidos con éxito', players);
  } catch (error) {
    next(error); // Pasamos el error al manejador global
  }
};

exports.getPlayerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await playerService.getPlayerById(id);
    if (!player) {
      return errorResponse(res, 'Jugador no encontrado', 404);
    }
    successResponse(res, 'Jugador obtenido con éxito', player);
  } catch (error) {
    next(error);
  }
};

exports.createPlayer = async (req, res, next) => {
  try {
    const newPlayer = await playerService.createPlayer(req.body);
    successResponse(res, 'Jugador creado con éxito', newPlayer, 201);
  } catch (error) {
    next(error);
  }
};

exports.updatePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPlayer = await playerService.updatePlayer(id, req.body);
    if (!updatedPlayer) {
      return errorResponse(res, 'Jugador no encontrado para actualizar', 404);
    }
    successResponse(res, 'Jugador actualizado con éxito', updatedPlayer);
  } catch (error) {
    next(error);
  }
};

exports.deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await playerService.deletePlayer(id);
    if (!result) {
      return errorResponse(res, 'Jugador no encontrado para eliminar', 404);
    }
    successResponse(res, 'Jugador eliminado con éxito', null);
  } catch (error) {
    next(error);
  }
};