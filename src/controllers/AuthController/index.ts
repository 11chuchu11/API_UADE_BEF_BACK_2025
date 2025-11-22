import { Request, Response, NextFunction } from 'express';

import { ReqUserLoginDTO, ReqUserRegisterDTO } from '../../dtos/User';
import AuthService from './../../services/AuthService';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = new ReqUserLoginDTO(req.body);

      const response = await AuthService.login(userData);

      res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = new ReqUserRegisterDTO(req.body);

      const response = await AuthService.register(userData);

      res.status(201).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AuthController();
