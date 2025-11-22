import { formatISODate } from '../../../../utils/format-date-time';

export const appointmentTemplate = (
  patientName: string,
  email: string,
  dateTime: Date,
  state: 'confirmed' | 'cancelled' | 'requested',
) => {
  const { date, time } = formatISODate(dateTime as unknown as string);

  const stateMApper = {
    confirmed: 'confirmada',
    cancelled: 'cancelada',
    requested: 'solicitada',
  };

  return {
    to: email,
    subject: `Cita ${stateMApper[state]}`,
    text: ``,
    html: `<p>Hola ${patientName}, su cita ha sido ${stateMApper[state]} para el día ${date} a las ${time}.</p>`,
  };
};
