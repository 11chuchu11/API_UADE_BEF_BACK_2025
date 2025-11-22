import { Request, Response, NextFunction } from 'express';

import { ReqInsuranceCreateDTO, ReqInsuranceUpdateDTO } from '../../dtos/Insurance';
import InsuranceService from '../../services/InsuranceService';

class InsuranceController {
  async findInsuranceById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await InsuranceService.findInsuranceById(Number(id));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findInsuranceByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query as { name: string };

      const response = await InsuranceService.findInsuranceByName(name);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findAllInsurances(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await InsuranceService.findAllInsurances();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createInsurance(req: Request, res: Response, next: NextFunction) {
    try {
      const insuranceData = new ReqInsuranceCreateDTO(req.body);

      const response = await InsuranceService.createInsurance(insuranceData);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateInsurance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const insuranceData = new ReqInsuranceUpdateDTO({ ...req.body, id: Number(id) });

      const response = await InsuranceService.updateInsurance(insuranceData);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async activateInsurance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await InsuranceService.activateInsurance(Number(id));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deactivateInsurance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await InsuranceService.deactivateInsurance(Number(id));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteInsurance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await InsuranceService.deleteInsurance(Number(id));

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new InsuranceController();
