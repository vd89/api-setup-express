import pino from 'pino';
import { pinoConfig } from './logger.config';

export const logger = pino(pinoConfig);
