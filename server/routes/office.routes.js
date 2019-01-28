import express from 'express';
import middleware from '../middleware/auth.validation';
import officeMiddleware from '../middleware/office.middleware';
import officeControllers from '../controllers/office.controllers';

const router = express.Router();


router.use(middleware.verifyToken);

// register candidate
router.post('/office/:id/register',
  officeMiddleware.validateCandidate,
  officeMiddleware.registerCandidate,
  officeControllers.registerCandidate);


export default router;
