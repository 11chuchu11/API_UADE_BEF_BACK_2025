import cors from 'cors';
import express from 'express';

import { handleError, notFound } from './middlewares';
import apiRouter from './routes';
import { logInfo } from './utils/logger';

const app = express();

app.use(cors());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  logInfo(req.path);
  next();
});
app.use(express.json());
app.use('/api', apiRouter);
app.use(handleError);
app.use(notFound);

export default app;
