import express from 'express';
import officeMiddleware from '../middleware/office.middleware';
import officeControllers from '../controllers/office.controllers';
import officeValidation from '../middleware/office.validation';
import authMiddleware from '../middleware/auth.validation';
import authHelper from '../helper/auth.helper';


const router = express.Router();


// offices
router.get('/offices',
  authMiddleware.verifyToken,
  officeMiddleware.getAllOffices,
  officeControllers.getAllOffices);

router.get('/offices/:id',
  authMiddleware.verifyToken,
  authHelper.checkParams,
  officeMiddleware.getOfficesById,
  officeControllers.getOfficeById);

router.post('/offices',
  authMiddleware.verifyToken,
  authHelper.isAdmin,
  authHelper.bodyIsString,
  officeValidation,
  officeMiddleware.createOffice,
  officeControllers.createOffice);

// register candidate
router.post('/office/:id/register',
  authMiddleware.verifyToken,
  authHelper.isAdmin,
  authHelper.checkParams,
  authHelper.bodyIsNumber,
  officeMiddleware.registerCandidate,
  officeControllers.registerCandidate);

router.post('/office/:id/result',
  authMiddleware.verifyToken,
  authHelper.checkParams,
  officeMiddleware.checkOfficeId,
  officeMiddleware.getResultByOffice,
  officeControllers.getResults);


export default router;
