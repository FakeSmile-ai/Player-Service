// src/app.js

const express = require('express');
require('dotenv').config();
const { pool, connectWithRetry } = require('./config/database');
const playerRoutes = require('./routes/playerRoutes');
const { notFound, errorHandler } = require('./utils/apiResponse');
const setupSwagger = require('./config/swagger'); // Importamos nuestra configuración

const app = express();
const port = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        position VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createTableQuery);
    console.log('👍 Tabla "players" verificada/creada con éxito.');
  } catch (error) {
    console.error('❌ Error al inicializar la tabla "players":', error.message);
    throw error;
  }
}

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '¡El servicio de jugadores está funcionando! 🚀' });
});

// --- Rutas de la API ---
app.use('/api/players', playerRoutes);

// --- Manejadores de Errores (deben ir después de las rutas) ---
app.use(notFound);
app.use(errorHandler);

// Función principal para iniciar el servidor
async function startServer() {
  try {
    await connectWithRetry();
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
      setupSwagger(app); // Configuramos Swagger después de que el servidor está escuchando
    });
  } catch (error) {
    console.error('Fatal error: Could not start server.', error.message);
    process.exit(1);
  }
}

startServer();