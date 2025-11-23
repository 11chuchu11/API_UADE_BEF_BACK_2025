import { Router } from 'express';

import AppointmentController from '../../controllers/AppointmentController';
import { handleAuthorization } from '../../middlewares/handleAuthorization';
import { validateData } from '../../middlewares/validateData';
import {
  createAppointmentSchema,
  deleteAppointmentSchema,
  findAppointmentByIdSchema,
  patchStateAppointmentSchema,
  updateAppointmentSchema,
} from '../../schemas/appointmentSchemas';

const appointmentRouter = Router();

appointmentRouter.get('/all', AppointmentController.findAllAppointments);

appointmentRouter.get('/all/next', AppointmentController.findNextAppointments);

appointmentRouter.get(
  '/:id',
  handleAuthorization,
  validateData(findAppointmentByIdSchema),
  AppointmentController.findAppointmentById,
);

appointmentRouter.post(
  '/',
  validateData(createAppointmentSchema),
  AppointmentController.createAppointment,
);

appointmentRouter.put(
  '/:id',
  handleAuthorization,
  validateData(updateAppointmentSchema),
  AppointmentController.updateAppointment,
);

appointmentRouter.patch(
  '/:id/confirm',
  handleAuthorization,
  validateData(patchStateAppointmentSchema),
  AppointmentController.confirmAppointment,
);

appointmentRouter.patch(
  '/:id/cancel',
  handleAuthorization,
  validateData(patchStateAppointmentSchema),
  AppointmentController.cancelAppointment,
);

appointmentRouter.delete(
  '/:id',
  handleAuthorization,
  validateData(deleteAppointmentSchema),
  AppointmentController.deleteAppointment,
);

export default appointmentRouter;
