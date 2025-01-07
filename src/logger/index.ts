import pino from 'pino';
import { pinoConfig } from './logger.config';

// Export single logger instance
export const logger = pino(pinoConfig);
export default logger;
