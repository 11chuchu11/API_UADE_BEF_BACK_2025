import { Router } from 'express';

import InsuranceController from '../../controllers/InsuranceController';
import { handleAuthorization } from '../../middlewares/handleAuthorization';
import { validateData } from '../../middlewares/validateData';
import {
  createInsuranceSchema,
  deleteInsuranceSchema,
  findInsuranceByIdSchema,
  findInsuranceByNameSchema,
  patchActiveInsuranceSchema,
  updateInsuranceSchema,
} from '../../schemas/insuranceSchemas';

const insuranceRouter = Router();

insuranceRouter.get('/all', InsuranceController.findAllInsurances);

insuranceRouter.get(
  '/:id',
  handleAuthorization,
  validateData(findInsuranceByIdSchema),
  InsuranceController.findInsuranceById,
);

insuranceRouter.get(
  '/',
  handleAuthorization,
  validateData(findInsuranceByNameSchema),
  InsuranceController.findInsuranceByName,
);

insuranceRouter.post(
  '/',
  handleAuthorization,
  validateData(createInsuranceSchema),
  InsuranceController.createInsurance,
);

insuranceRouter.put(
  '/:id',
  handleAuthorization,
  validateData(updateInsuranceSchema),
  InsuranceController.updateInsurance,
);

insuranceRouter.patch(
  '/:id/activate',
  handleAuthorization,
  validateData(patchActiveInsuranceSchema),
  InsuranceController.activateInsurance,
);

insuranceRouter.patch(
  '/:id/deactivate',
  handleAuthorization,
  validateData(patchActiveInsuranceSchema),
  InsuranceController.deactivateInsurance,
);

insuranceRouter.delete(
  '/:id',
  handleAuthorization,
  validateData(deleteInsuranceSchema),
  InsuranceController.deleteInsurance,
);

export default insuranceRouter;
