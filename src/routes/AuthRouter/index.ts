import { Router } from 'express';

import AuthController from '../../controllers/AuthController';
import { validateData } from '../../middlewares/validateData';
import { loginSchema, registerSchema } from '../../schemas/authSchemas';

const authRouter = Router();

authRouter.post('/register', validateData(registerSchema), AuthController.register);

authRouter.post('/', validateData(loginSchema), AuthController.login);

export default authRouter;
