// src/config/logger.js

const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const env = process.env.NODE_ENV || 'development';
const logDirectory = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const jsonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ level, message, timestamp, ...metadata }) => {
    const meta = Object.keys(metadata).length ? ` ${JSON.stringify(metadata)}` : '';
    return `[${timestamp}] ${level}: ${message}${meta}`;
  })
);

const logger = createLogger({
  level: env === 'production' ? 'info' : 'debug',
  format: env === 'production' ? jsonFormat : format.combine(format.splat(), consoleFormat),
  transports: [
    new transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
      format: jsonFormat,
    }),
    new transports.File({
      filename: path.join(logDirectory, 'combined.log'),
      format: jsonFormat,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(logDirectory, 'exceptions.log'), format: jsonFormat }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(logDirectory, 'rejections.log'), format: jsonFormat }),
  ],
});

logger.add(
  new transports.Console({
    format: env === 'production' ? jsonFormat : consoleFormat,
  })
);

module.exports = logger;
