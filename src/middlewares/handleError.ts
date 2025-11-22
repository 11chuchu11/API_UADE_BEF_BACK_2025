import { logError } from '../utils/logger';

export default (error: any, request: any, response: any, next: any) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Id used is malformed' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else {
    return response.status(500).json({ error: error.message });
  }

  logError(error.message);
  next(error);
};
