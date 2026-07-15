import type { NextFunction, Request, Response } from 'express';

export const mustBeLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in');
  }
  next();
};

export const selfOnly =
  (action: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id !== String(req.user?.id)) {
      return res.status(403).send(`You can only ${action} yourself.`);
    }
    next();
  };

export const forbidden = (res: Response, message: string) => {
  return res.status(403).send(message);
};
