import { Insurance } from '@prisma/client';

import { ReqInsuranceUpdateDTO } from '../../../dtos/Insurance';

export interface IInsuranceRepository {
  findInsuranceByName(name: string): Promise<Insurance | null>;
  findAllInsurances(): Promise<Insurance[]>;
  createInsurance(data: ReqInsuranceUpdateDTO): Promise<Insurance>;
  updateInsurance(data: ReqInsuranceUpdateDTO): Promise<Insurance>;
  deleteInsurance(id: number): Promise<any>;
}
