import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';
import { logError } from '../utils/logger';

const getToken = (req: Request) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const handleAuthorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    logError(error);
    return res.status(401).json({ message: 'Unauthorized or expired token' });
  }
};

export { handleAuthorization };
