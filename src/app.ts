import cors from 'cors';
import express from 'express';

import { handleError, notFound } from './middlewares';
import apiRouter from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use(handleError);
app.use(notFound);

export default app;
