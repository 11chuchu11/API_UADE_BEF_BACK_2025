import { Insurance } from '@prisma/client';

import { ReqInsuranceCreateDTO, ReqInsuranceUpdateDTO } from '../../../dtos/Insurance';
import { prisma } from '../../../utils/prisma';
import { IInsuranceRepository } from '../../interfaces/InsuranceRepository';

class InsuranceRepository implements IInsuranceRepository {
  findInsuranceById(id: number): Promise<Insurance | null> {
    return prisma.insurance.findUnique({
      where: { id },
    });
  }

  findInsuranceByName(name: string): Promise<Insurance | null> {
    return prisma.insurance.findFirst({
      where: { name },
    });
  }

  findAllInsurances(): Promise<Insurance[]> {
    return prisma.insurance.findMany();
  }

  createInsurance(data: ReqInsuranceCreateDTO): Promise<Insurance> {
    return prisma.insurance.create({
      data,
    });
  }

  updateInsurance(data: ReqInsuranceUpdateDTO): Promise<Insurance> {
    return prisma.insurance.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        active: data.active,
      },
    });
  }

  deleteInsurance(id: number): Promise<any> {
    return prisma.insurance.delete({
      where: { id },
    });
  }
}

export default new InsuranceRepository();
