import express, { NextFunction, Request, Response } from 'express';
import { Data, ErrorResponse } from './index.types';

const app = express();
const port = 3000;

// Error handling middleware
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const errorResponse: ErrorResponse = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };
  res.status(500).json(errorResponse);
  _next();
};

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

app.get('/', (_req: Request, res: Response): void => {
  const date: Date = new Date();
  const data: Data = {
    status: 'success',
    message: 'Hello, world!',
    date: date.toUTCString(),
  };
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
  console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
