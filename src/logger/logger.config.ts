import pino from 'pino';
import { join, resolve } from 'path';
import * as fs from 'fs';

// Create logs directory if it doesn't exist
const logDirectory = resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const errorFileStream = pino.destination({
  dest: join(logDirectory, 'error.log'),
  mkdir: true,
  sync: false,
});

const infoFileStream = pino.destination({
  dest: join(logDirectory, 'info.log'),
  mkdir: true,
  sync: true,
});

const consoleStream = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    levelFirst: true,
    translateTime: 'yyyy-mm-dd HH:MM:ss',
  },
};

export const pinoConfig = {
  timestamp: pino.stdTimeFunctions.isoTime,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  customLevels: levels,
  streams: [
    { stream: errorFileStream, level: 'error', transport: consoleStream },
    { stream: infoFileStream, level: 'info', transport: consoleStream },
    { stream: process.stdout, level: 'info', transport: consoleStream },
  ],
};
