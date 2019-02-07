import express from 'express';
import authMiddleware from '../middleware/auth.validation';
import intrestMiddleware from '../middleware/interest.middleware';
import interestControllers from '../controllers/interest.controllers';
import authHelper from '../helper/auth.helper';

const router = express.Router();

// Get all intrested candidates
router.get('/interest/:id',
  authMiddleware.verifyToken,
  authHelper.checkParams,
  authHelper.isAdmin,
  intrestMiddleware.getAllIntrestee,
  interestControllers.getAllIntrested);

// get all candidates
router.get('/candidates/:id',
  authMiddleware.verifyToken,
  authHelper.checkParams,
  intrestMiddleware.getAllCandidates,
  interestControllers.getAllCandidates);

// create interest
router.post('/interest/:id/register',
  authMiddleware.verifyToken,
  authHelper.checkParams,
  authHelper.bodyIsNumber,
  intrestMiddleware.declearInterest,
  interestControllers.registerInterest);


export default router;
