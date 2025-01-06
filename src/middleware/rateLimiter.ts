import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export const createRateLimiter = (maxRequests: number, windowMs: number): RateLimitRequestHandler => {
  return rateLimit({
    max: maxRequests,
    windowMs: windowMs,
    message: 'Too many requests from this IP, please try again later',
  });
};
