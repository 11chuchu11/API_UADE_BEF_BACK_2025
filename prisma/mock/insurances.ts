import { Prisma } from "@prisma/client"

export const insurances:Prisma.InsuranceCreateManyInput[] =  [
      { name: 'OSDE', description: 'Cobertura médica premium' },
      { name: 'Swiss Medical', description: 'Plan de cobertura general' },
      { name: 'Galeno', description: 'Seguro médico integral' },
      { name: 'Medifé', description: 'Cobertura amplia' },
      { name: 'Sancor Salud', description: 'Seguro de salud nacional' },
      { name: 'OMINT', description: 'Cobertura médica privada' },
      { name: 'Hospital Italiano', description: 'Plan médico del HI' },
      { name: 'Accord Salud', description: 'Cobertura completa' },
      { name: 'PAMI', description: 'Plan estatal para jubilados' },
      { name: 'OSECAC', description: 'Obra social de empleados de comercio' }
    ]
  