// src/config/database.js

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // Aumentamos el timeout de conexión
};

// Creamos un "pool" de conexiones.
const pool = mysql.createPool(dbConfig);

// Función para esperar un tiempo determinado
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Nueva función para conectar con reintentos
async function connectWithRetry(retries = 5) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('✅ ¡Conexión a la base de datos exitosa!');
      connection.release();
      return; // Si la conexión es exitosa, salimos de la función
    } catch (error) {
      lastError = error;
      console.log(`❌ Intento de conexión ${i + 1}/${retries} fallido. Reintentando en 5 segundos...`);
      await sleep(5000); // Esperamos 5 segundos antes de reintentar
    }
  }
  // Si todos los reintentos fallan, lanzamos el último error
  throw new Error(`No se pudo conectar a la base de datos después de ${retries} intentos. Error: ${lastError.message}`);
}

// Exportamos el pool y la función de conexión
module.exports = {
  pool,
  connectWithRetry,
};