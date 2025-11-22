import {
  ReqInsuranceCreateDTO,
  ReqInsuranceUpdateDTO,
  ResInsuranceDTO,
} from '../../dtos/Insurance';
import InsuranceRepository from '../../repositories/data/InsuranceRepository';

class InsuranceService {
  async findInsuranceById(id: number) {
    const insurance = await InsuranceRepository.findInsuranceById(id);

    if (!insurance) {
      throw new Error('Insurance not found');
    }

    return new ResInsuranceDTO(insurance);
  }

  async findInsuranceByName(name: string) {
    const insurance = await InsuranceRepository.findInsuranceByName(name);

    if (!insurance) {
      throw new Error('Insurance not found');
    }

    return insurance ? new ResInsuranceDTO(insurance) : null;
  }

  async findAllInsurances() {
    const insurances = await InsuranceRepository.findAllInsurances();

    return insurances.map(insurance => new ResInsuranceDTO(insurance));
  }

  async createInsurance(data: ReqInsuranceCreateDTO) {
    const previousInsurance = await InsuranceRepository.findInsuranceByName(data.name);

    if (previousInsurance) {
      throw new Error('Insurance with this name already exists');
    }

    const newInsurance = await InsuranceRepository.createInsurance(data);

    return new ResInsuranceDTO(newInsurance);
  }

  async updateInsurance(data: ReqInsuranceUpdateDTO) {
    const updatedInsurance = await InsuranceRepository.updateInsurance(data);

    return new ResInsuranceDTO(updatedInsurance);
  }

  async activateInsurance(id: number) {
    const insurance = await InsuranceRepository.findInsuranceById(id);

    if (!insurance) {
      throw new Error('Insurance not found');
    }

    const updatedInsurance = await InsuranceRepository.updateInsurance({
      ...insurance,
      active: true,
    });

    return new ResInsuranceDTO(updatedInsurance);
  }

  async deactivateInsurance(id: number) {
    const insurance = await InsuranceRepository.findInsuranceById(id);

    if (!insurance) {
      throw new Error('Insurance not found');
    }

    const updatedInsurance = await InsuranceRepository.updateInsurance({
      ...insurance,
      active: false,
    });

    return new ResInsuranceDTO(updatedInsurance);
  }

  async deleteInsurance(id: number) {
    const insurance = await InsuranceRepository.findInsuranceById(id);
    if (!insurance) {
      throw new Error('Insurance not found');
    }

    return InsuranceRepository.deleteInsurance(id);
  }
}

export default new InsuranceService();
