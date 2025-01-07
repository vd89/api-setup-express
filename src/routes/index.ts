import { Request, Response } from 'express';
import { Route } from '../gateway/types';
import logger from '../logger';

export const routes: Route[] = [
  {
    path: '/',
    method: 'GET',
    handler: (_req: Request, res: Response): void => {
      const date = new Date();
      logger.info('Hello, world!', date.toUTCString());
      res.status(200).json({
        data: {
          status: 'success',
          message: 'Hello, world!',
          date: date.toUTCString(),
        },
      });
    },
  },
  {
    path: '/health',
    method: 'GET',
    handler: (_req: Request, res: Response): void => {
      res.status(200).json({
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
        },
      });
    },
  },
];
