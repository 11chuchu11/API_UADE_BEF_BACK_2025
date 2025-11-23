import moment from 'moment';
import 'moment/locale/es';

type FormattedDateTime = {
  date: string;
  time: string;
};

export const formatISODate = (isoString: string): FormattedDateTime => {
  const m = moment(isoString);

  if (!m.isValid()) {
    throw new Error('Fecha ISO inválida');
  }

  // Establecemos el locale (es-AR no existe, pero 'es' ya es correcto)
  m.locale('es');

  const date = m.format('DD/MM/YYYY');
  const time = m.format('hh:mm A'); // am/pm nativo de moment

  return { date, time };
}
