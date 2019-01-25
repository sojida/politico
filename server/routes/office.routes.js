import express from 'express';
import officeMiddleware from '../middleware/office.middleware';
import officeControllers from '../controllers/office.controllers';
import officeValidation from '../middleware/office.validation';

const router = express.Router();

// offices
router.get('/offices',
  officeMiddleware.getAllOffices,
  officeControllers.getAllOffices);

router.get('/offices/:id',
  officeMiddleware.getOfficesById,
  officeControllers.getOfficeById);

router.post('/offices',
  officeValidation,
  officeMiddleware.createOffice,
  officeControllers.creatOffice);

export default router;
