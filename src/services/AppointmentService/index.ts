import {
  ReqAppointmentCreateDTO,
  ReqAppointmentUpdateDTO,
  ResAppointmentDTO,
} from '../../dtos/Appointment';
import AppointmentRepository from '../../repositories/data/AppointmentRepository';
import { GmailStrategy } from '../../strategies/implementations/GmailStategy';
import { appointmentTemplate } from '../../strategies/implementations/GmailStategy/templates/Email';
import { logError } from '../../utils/logger';
import InsuranceService from '../InsuranceService';

class AppointmentService {
  async findAppointmentById(id: number) {
    const appointment = await AppointmentRepository.findAppointmentById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return new ResAppointmentDTO(appointment);
  }

  async findAllAppointments() {
    const appointments = await AppointmentRepository.findAllAppointments();

    return appointments.map(appointment => new ResAppointmentDTO(appointment));
  }

  async createAppointment(appointmentData: ReqAppointmentCreateDTO) {
    const gmailStrategy = new GmailStrategy();
    await gmailStrategy.init();

    await InsuranceService.findInsuranceById(appointmentData.insurance_id);
    const newAppointment = await AppointmentRepository.createAppointment(appointmentData);

    const reservationData = appointmentTemplate(
      newAppointment.patient,
      newAppointment.email,
      newAppointment.date_time,
      'requested',
    );
    await gmailStrategy.sendEmail(reservationData).catch(logError);

    return new ResAppointmentDTO(newAppointment);
  }

  async updateAppointment(appointmentData: ReqAppointmentUpdateDTO) {
    const appointment = await AppointmentRepository.findAppointmentById(appointmentData.id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    const insurance = await InsuranceService.findInsuranceById(appointmentData.insurance_id);
    if (!insurance) {
      throw new Error('Insurance not found');
    }

    const updatedAppointment = await AppointmentRepository.updateAppointment(appointmentData);

    return new ResAppointmentDTO(updatedAppointment);
  }

  async confirmAppointment(id: number) {
    const gmailStrategy = new GmailStrategy();
    await gmailStrategy.init();

    const appointment = await AppointmentRepository.findAppointmentById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const appointmentWithoutInsurance = { ...appointment, insurance: undefined };
    delete appointmentWithoutInsurance.insurance;
    const updatedAppointment = await AppointmentRepository.updateAppointment({
      ...appointmentWithoutInsurance,
      state: 'confirmed',
    });
    await gmailStrategy
      .sendEmail(
        appointmentTemplate(
          updatedAppointment.patient,
          updatedAppointment.email,
          updatedAppointment.date_time,
          'confirmed',
        ),
      )
      .catch(logError);

    return new ResAppointmentDTO(updatedAppointment);
  }

  async cancelAppointment(id: number) {
    const gmailStrategy = new GmailStrategy();
    await gmailStrategy.init();

    const appointment = await AppointmentRepository.findAppointmentById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const appointmentWithoutInsurance = { ...appointment, insurance: undefined };
    delete appointmentWithoutInsurance.insurance;
    const updatedAppointment = await AppointmentRepository.updateAppointment({
      ...appointmentWithoutInsurance,
      state: 'cancelled',
    });
    await gmailStrategy
      .sendEmail(
        appointmentTemplate(
          updatedAppointment.patient,
          updatedAppointment.email,
          updatedAppointment.date_time,
          'cancelled',
        ),
      )
      .catch(logError);

    return new ResAppointmentDTO(updatedAppointment);
  }

  async deleteAppointment(id: number) {
    const appointment = await AppointmentRepository.findAppointmentById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return await AppointmentRepository.deleteAppointment(id);
  }
}

export default new AppointmentService();
