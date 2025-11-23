import { Request, Response, NextFunction } from 'express';

import { ReqAppointmentCreateDTO, ReqAppointmentUpdateDTO } from '../../dtos/Appointment';
import AppointmentService from '../../services/AppointmentService';

class AppointmentController {
  async findAppointmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await AppointmentService.findAppointmentById(Number(id));

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async findNextAppointments(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AppointmentService.findNextAppointments();

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async findAllAppointments(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AppointmentService.findAllAppointments();

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async createAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const appointmentData = new ReqAppointmentCreateDTO(req.body);

      const response = await AppointmentService.createAppointment(appointmentData);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const appointmentData = new ReqAppointmentUpdateDTO({ ...req.body, id: Number(id) });

      const response = await AppointmentService.updateAppointment(appointmentData);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async confirmAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await AppointmentService.confirmAppointment(Number(id));

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async cancelAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await AppointmentService.cancelAppointment(Number(id));

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await AppointmentService.deleteAppointment(Number(id));

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AppointmentController();
