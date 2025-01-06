import express from 'express';
import { HttpLogger, pinoHttp } from 'pino-http';
import morgan from 'morgan';
import { ApiGateway } from './gateway/gateway';
import { routes } from './routes';
import { logger } from './logger';
import { securityMiddleware } from './middleware/security';
import { createRateLimiter } from './middleware/rateLimiter';
import { GatewayConfig } from './gateway/types';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Pino HTTP logger
const pinoMiddleware = pinoHttp({
  logger,
  customLogLevel: (_req, res) => {
    if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
    if (res.statusCode >= 500) return 'error';
    return 'info';
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
}) as unknown as HttpLogger;

// Basic middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(pinoMiddleware);
app.use(morgan('combined'));

// Initialize API Gateway
const gatewayConfig: GatewayConfig = {
  routes,
  middleware: [
    ...securityMiddleware,
    createRateLimiter(100, 60 * 60 * 1000), // 100 requests per hour
  ],
};

const gateway = new ApiGateway(gatewayConfig);

// Mount the gateway router
app.use('/api', gateway.getRouter());

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ err }, 'An error occurred');
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
  next(err);
});

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
});

const server = app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

export { app, server };
