import express from 'express';
import officeMiddleware from '../middleware/office.middleware';
import officeControllers from '../controllers/office.controllers';
import officeValidation from '../middleware/office.validation';
import middleware from '../middleware/auth.validation';

const router = express.Router();

router.use(middleware.verifyToken);

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

// register candidate
router.post('/office/:id/register',
  officeMiddleware.registerCandidate,
  officeControllers.registerCandidate);

router.post('/office/:id/result',
  officeMiddleware.checkOfficeId,
  officeMiddleware.getResultByOffice,
  officeControllers.getResults);


export default router;
