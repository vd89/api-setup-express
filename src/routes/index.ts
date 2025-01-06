import { Request, Response } from 'express';
import { Route } from '../gateway/types';

export const routes: Route[] = [
  {
    path: '/',
    method: 'GET',
    handler: (_req: Request, res: Response): void => {
      const date = new Date();
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
        data:{
          status: 'healthy',
          timestamp: new Date().toISOString(),
        }
      });
    },
  },
];
