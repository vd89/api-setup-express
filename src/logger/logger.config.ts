import pino from 'pino';

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

export const pinoConfig = {
  timestamp: pino.stdTimeFunctions.isoTime,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  customLevels: levels,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
  },
};
