import { Prisma } from '@prisma/client';

import { ReqAppointmentCreateDTO, ReqAppointmentUpdateDTO } from '../../../dtos/Appointment';

export type AppointmentWithInsurance = Prisma.AppointmentGetPayload<{
  include: { insurance: true };
}>;

export interface IAppointmentRepository {
  findAppointmentById(id: number): Promise<AppointmentWithInsurance | null>;
  findNextAppointments(): Promise<AppointmentWithInsurance[]>;
  findAllAppointments(): Promise<AppointmentWithInsurance[]>;
  createAppointment(data: ReqAppointmentCreateDTO): Promise<AppointmentWithInsurance>;
  updateAppointment(data: ReqAppointmentUpdateDTO): Promise<AppointmentWithInsurance>;
  deleteAppointment(id: number): Promise<any>;
}
