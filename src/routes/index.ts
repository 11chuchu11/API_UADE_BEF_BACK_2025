import { Router } from 'express';

import appointmentRouter from './AppointmentRouter';
import authRouter from './AuthRouter';
import insuranceRouter from './InsuranceRouter';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/insurance', insuranceRouter);
apiRouter.use('/appointment', appointmentRouter);

export default apiRouter;
