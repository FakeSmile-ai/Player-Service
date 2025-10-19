// src/utils/apiResponse.js

// Función para estandarizar respuestas exitosas
const successResponse = (res, message, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

// Función para estandarizar respuestas de error
const errorResponse = (res, message, statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    errors,
  });
};

// Middleware para manejar rutas no encontradas (404)
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware para manejar todos los demás errores
const errorHandler = (err, req, res, next) => {
  // A veces un error puede venir con un status code, si no, es un error interno (500)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`[ERROR] ${statusCode} - ${err.message}\nStack: ${err.stack}`);

  errorResponse(
    res,
    // No mostramos detalles del error en producción por seguridad
    process.env.NODE_ENV === 'production' ? 'Ocurrió un error en el servidor' : err.message,
    statusCode
  );
};


module.exports = {
  successResponse,
  errorResponse,
  notFound,
  errorHandler,
};