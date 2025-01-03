import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import morgan from 'morgan';
import { Data, ErrorResponse } from './index.types';

import { logger } from './logger';
import  { HttpLogger, pinoHttp } from 'pino-http';

const app = express();
const port = 3000;

// Security HTTP Headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend domain
    credentials: true,
  }),
);

// Add Pino HTTP logger middleware
const pinoMiddleware = pinoHttp({
  logger: logger,
  // Define custom options that match Pino's expected types
  customLogLevel: function (_req:Request, res:Response) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500) {
      return 'error';
    }
    return 'info';
  },
  // Custom success message function
  customSuccessMessage: function (req:Request, res:Response) {
    return `${req.method} ${req.url} completed with status ${res.statusCode}`;
  },
  // Custom error message function with correct parameter order
  customErrorMessage: function (req:Request, res:Response, error:Error) {
    return `${req.method} ${req.url} failed with status ${res.statusCode}: ${error?.message || 'Unknown error'}`;
  },
  // Custom properties to add to logs
  customProps: function (req:Request) {
    return {
      correlationId: req.id,
      userAgent: req.headers['user-agent']
    };
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
}) as unknown as HttpLogger;
app.use(pinoMiddleware);
// Body parser with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// Remove X-Powered-By header
app.disable('x-powered-by');

// Custom security middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Logging middleware
app.use(morgan('combined'));

// Error handling middleware
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error({ err }, 'An error occurred');
  const errorResponse: ErrorResponse = {
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  };
  res.status(500).json(errorResponse);
  _next(err);
};

app.get('/', (_req: Request, res: Response): void => {
  logger.info('Processing root route request');
  const date: Date = new Date();
  const data: Data = {
    status: 'success',
    message: 'Hello, world!',
    date: date.toUTCString(),
  };
  logger.debug({data},'Sending response');
  res.status(200).json({ data });
});

// Middleware to handle 404 errors
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
});

app.use(errorHandler);

const server = app.listen(port, (): void => {
  logger.info(`Server is running at http://localhost:${port}`);
});

export { app, server };
