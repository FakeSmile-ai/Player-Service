// src/services/playerService.js

const db = require('../config/database');

// Servicio para obtener todos los jugadores
exports.getAllPlayers = async () => {
  const [rows] = await db.query('SELECT * FROM players');
  return rows;
};

// Servicio para obtener un jugador por su ID
exports.getPlayerById = async (id) => {
  const [rows] = await db.query('SELECT * FROM players WHERE id = ?', [id]);
  return rows[0]; // Devuelve el primer resultado o undefined
};

// Servicio para crear un nuevo jugador
exports.createPlayer = async (player) => {
  const { name, age, position } = player;
  const [result] = await db.query(
    'INSERT INTO players (name, age, position) VALUES (?, ?, ?)',
    [name, age, position || null] // Usamos null si la posición no viene
  );
  // Devolvemos el jugador recién creado con su ID
  return { id: result.insertId, ...player };
};

// Servicio para actualizar un jugador
exports.updatePlayer = async (id, player) => {
  const { name, age, position } = player;
  const [result] = await db.query(
    'UPDATE players SET name = ?, age = ?, position = ? WHERE id = ?',
    [name, age, position, id]
  );
  if (result.affectedRows === 0) {
    return null; // No se actualizó ninguna fila
  }
  return { id, ...player };
};

// Servicio para eliminar un jugador
exports.deletePlayer = async (id) => {
  const [result] = await db.query('DELETE FROM players WHERE id = ?', [id]);
  return result.affectedRows > 0; // Devuelve true si se eliminó, false si no
};