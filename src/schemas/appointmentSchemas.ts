import { coerce, iso, object, string, enum as enumeration, number, email } from 'zod';

import { nameRegex, phoneRegex } from '../utils/regex';

const findAppointmentByIdSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
});

const createAppointmentSchema = object({
  body: object({
    patient: string().min(2).max(150).regex(nameRegex),
    phone: string().regex(phoneRegex),
    email: email(),
    date_time: iso
      .datetime({ offset: true, precision: null })
      .refine(date => new Date(date).getTime() > new Date().getTime()),
    state: enumeration(['requested', 'confirmed', 'cancelled']),
    insurance: object({
      id: number(),
    }),
  }).required(),
});

const updateAppointmentSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
  body: object({
    patient: string().min(2).max(150).regex(nameRegex),
    phone: string().regex(phoneRegex),
    email: email(),
    date_time: iso
      .datetime({ offset: true, precision: null })
      .refine(date => new Date(date).getTime() > new Date().getTime()),
    state: enumeration(['requested', 'confirmed', 'cancelled']),
    insurance: object({
      id: number(),
    }),
  }).required(),
});

const patchStateAppointmentSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
});

const deleteAppointmentSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
});

export {
  findAppointmentByIdSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
  patchStateAppointmentSchema,
  deleteAppointmentSchema,
};
