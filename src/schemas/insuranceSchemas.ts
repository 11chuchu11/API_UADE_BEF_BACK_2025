import { object, string, coerce, boolean, number } from 'zod';

const findInsuranceByIdSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
});

const findInsuranceByNameSchema = object({
  query: object({
    name: string().min(3).max(50),
  }).required(),
});

const createInsuranceSchema = object({
  body: object({
    name: string().min(3).max(50),
    description: string().min(3).max(255).optional(),
  }).required(),
});

const updateInsuranceSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
  body: object({
    id: number().optional(),
    name: string().min(3).max(50),
    description: string().min(3).max(255).optional(),
    active: boolean(),
  }).required(),
});

const patchActiveInsuranceSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
});

const deleteInsuranceSchema = object({
  params: object({
    id: coerce.number(),
  }).required(),
});

export {
  findInsuranceByIdSchema,
  findInsuranceByNameSchema,
  createInsuranceSchema,
  updateInsuranceSchema,
  patchActiveInsuranceSchema,
  deleteInsuranceSchema,
};
