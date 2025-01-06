import { Handler, NextFunction, Request, Response } from 'express';

export interface Route {
  path: string;
  method: string;
  handler: (req: Request, res: Response) => void;
}

export interface GatewayConfig {
  routes: Route[];
  middleware?: (Handler | ((req: Request, res: Response, next: NextFunction) => void))[];
}
