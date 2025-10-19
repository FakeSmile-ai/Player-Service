// src/middlewares/validationMiddleware.js

const Joi = require('joi');

// Esquema de validación para la creación de un jugador
const createPlayerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El nombre debe ser texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'any.required': 'El nombre es un campo requerido',
  }),
  age: Joi.number().integer().min(1).required().messages({
    'number.base': 'La edad debe ser un número',
    'number.integer': 'La edad debe ser un número entero',
    'number.min': 'La edad debe ser como mínimo 1',
    'any.required': 'La edad es un campo requerido',
  }),
  position: Joi.string().max(100).optional().allow(null, '').messages({
    'string.base': 'La posición debe ser texto',
  }),
});

// Esquema para la actualización (todos los campos son opcionales)
const updatePlayerSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    age: Joi.number().integer().min(1).optional(),
    position: Joi.string().max(100).optional().allow(null, '')
}).min(1).messages({ // Asegura que al menos un campo venga en la petición
    'object.min': 'Debes proporcionar al menos un campo para actualizar'
});


// Middleware genérico que usa un esquema para validar el body
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false, // Muestra todos los errores, no solo el primero
        convert: true // Convierte tipos de datos si es posible (ej. "25" a 25)
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({
        status: 'error',
        message: 'Datos de entrada inválidos',
        errors: errors,
      });
    }

    next(); // Si la validación es exitosa, pasa al siguiente middleware o controlador
  };
};


module.exports = {
  validateCreatePlayer: validateRequest(createPlayerSchema),
  validateUpdatePlayer: validateRequest(updatePlayerSchema),
};