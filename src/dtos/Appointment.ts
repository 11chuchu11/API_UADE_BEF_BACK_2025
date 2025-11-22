import { IInsurance, ResInsuranceDTO } from './Insurance';
import { formatISODate } from '../utils/format-date-time';

type AppointmentState = 'requested' | 'confirmed' | 'cancelled';

interface IAppointment {
  id: number;
  patient: string;
  phone: string;
  email: string;
  insurance: IInsurance;
  date_time: Date;
  state: AppointmentState;
  createdAt: Date;
  updatedAt: Date;
}

type IReqAppointmentDTO = Pick<IAppointment, 'patient' | 'phone' | 'email' | 'date_time' | 'state'>;

export class ReqAppointmentCreateDTO implements IReqAppointmentDTO {
  patient: string;
  phone: string;
  email: string;
  date_time: Date;
  state: AppointmentState;
  insurance_id: number;

  constructor(data: any) {
    this.patient = data.patient;
    this.phone = data.phone;
    this.email = data.email;
    this.date_time = data.date_time;
    this.state = data.state;
    this.insurance_id = data.insurance?.id ?? 0;
  }
}

export class ReqAppointmentUpdateDTO implements IReqAppointmentDTO {
  id: number;
  patient: string;
  phone: string;
  email: string;
  date_time: Date;
  state: AppointmentState;
  insurance_id: number;

  constructor(data: any) {
    this.id = data.id;
    this.patient = data.patient;
    this.phone = data.phone;
    this.email = data.email;
    this.date_time = data.date_time;
    this.state = data.state;
    this.insurance_id = data.insurance?.id ?? 0;
  }
}

type IResAppointmentDTO = Pick<IAppointment, 'id' | 'patient' | 'phone' | 'email' | 'state'>;

export class ResAppointmentDTO implements IResAppointmentDTO {
  id: number;
  patient: string;
  phone: string;
  email: string;
  state: AppointmentState;
  insurance: ResInsuranceDTO;
  date: string;
  time: string;

  constructor(data: any) {
    this.id = data.id;
    this.patient = data.patient;
    this.phone = data.phone;
    this.state = data.state;
    this.email = data.email;
    this.insurance = new ResInsuranceDTO(data.insurance);
    const dateObj = formatISODate(data.date_time.toISOString());
    this.date = dateObj.date;
    this.time = dateObj.time;
  }
}
