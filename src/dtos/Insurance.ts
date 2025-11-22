export interface IInsurance {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type IReqInsuranceCreateDTO = Pick<IInsurance, 'name' | 'description'>;
type IReqInsuranceUpdateDTO = Pick<IInsurance, 'id' | 'name' | 'description' | 'active'>;

export class ReqInsuranceCreateDTO implements IReqInsuranceCreateDTO {
  name: string;
  description: string;

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
  }
}

export class ReqInsuranceUpdateDTO implements IReqInsuranceUpdateDTO {
  id: number;
  name: string;
  description: string;
  active: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.active = data.active;
  }
}

type IResInsuranceDTO = Pick<IInsurance, 'id' | 'name' | 'description' | 'active'>;

export class ResInsuranceDTO implements IResInsuranceDTO {
  id: number;
  name: string;
  description: string;
  active: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.active = data.active;
  }
}
