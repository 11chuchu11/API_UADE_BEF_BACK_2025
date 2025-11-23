import { Appointment } from '@prisma/client';

import { ReqAppointmentCreateDTO, ReqAppointmentUpdateDTO } from '../../../dtos/Appointment';
import { prisma } from '../../../utils/prisma';
import {
  AppointmentWithInsurance,
  IAppointmentRepository,
} from '../../interfaces/AppointmentRepository';

class AppointmentRepository implements IAppointmentRepository {
  findAppointmentById(id: number): Promise<AppointmentWithInsurance | null> {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        insurance: true,
      },
    });
  }

  findNextAppointments(): Promise<AppointmentWithInsurance[]> {
    return prisma.appointment.findMany({
      where: {
        state: {
          not: 'cancelled',
        },
      },
      include: {
        insurance: true,
      },
    });
  }

  findAllAppointments(): Promise<AppointmentWithInsurance[]> {
    return prisma.appointment.findMany({
      include: {
        insurance: true,
      },
    });
  }

  createAppointment(data: ReqAppointmentCreateDTO): Promise<AppointmentWithInsurance> {
    return prisma.appointment.create({
      data,
      include: {
        insurance: true,
      },
    });
  }

  updateAppointment(data: ReqAppointmentUpdateDTO): Promise<AppointmentWithInsurance> {
    return prisma.appointment.update({
      where: { id: data.id },
      data,
      include: {
        insurance: true,
      },
    });
  }

  deleteAppointment(id: number): Promise<any> {
    return prisma.appointment.delete({
      where: { id },
    });
  }
}

export default new AppointmentRepository();
