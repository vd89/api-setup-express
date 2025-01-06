import { Request, Response, NextFunction, Router } from 'express';
import { GatewayConfig, Route } from './types';
import { logger } from '../logger';

export class ApiGateway {
  private router: Router;
  private routes: Route[];
  private middleware: Array<(req: Request, res: Response, next: NextFunction) => void>;

  constructor(config: GatewayConfig) {
    this.router = Router();
    this.routes = config.routes;
    this.middleware = config.middleware || [];
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware(): void {
    this.middleware.forEach((middleware) => {
      this.router.use(middleware);
    });
  }

  private initializeRoutes(): void {
    this.routes.forEach((route) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.router as any)[route.method.toLowerCase()](route.path, this.wrapHandler(route.handler));
    });
  }

  private wrapHandler(
    handler: (req: Request, res: Response) => void,
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info(
          {
            method: req.method,
            path: req.path,
            query: req.query,
            body: req.body,
          },
          'Incoming request',
        );

        handler(req, res);

        logger.info(
          {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
          },
          'Request completed',
        );
      } catch (error) {
        logger.error(
          {
            method: req.method,
            path: req.path,
            error: error,
          },
          'Request failed',
        );
        next(error);
      }
    };
  }

  getRouter(): Router {
    return this.router;
  }
}
