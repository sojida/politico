import express from 'express';
import middleware from '../middleware/party.middleware';
import controllers from '../controllers/party.controllers';
import validateParty from '../middleware/party.validation';
import authMiddleware from '../middleware/auth.validation';
import authHelper from '../helper/auth.helper';


const router = express.Router();

router.get('/parties',
  authMiddleware.verifyToken,
  middleware.getAllParties,
  controllers.getAllParties);

router.get('/parties/:id',
  authMiddleware.verifyToken,
  authHelper.checkParams,
  middleware.getPartiesById,
  controllers.getPartiesById);

router.patch('/parties/:id/name',
  authMiddleware.verifyToken,
  authHelper.isAdmin,
  authHelper.checkParams,
  authHelper.bodyIsString,
  middleware.editParties,
  controllers.editParties);

router.delete('/parties/:id',
  authMiddleware.verifyToken,
  authHelper.isAdmin,
  authHelper.checkParams,
  middleware.deleteParty,
  controllers.deleteParties);

router.post('/parties',
  authMiddleware.verifyToken,
  authHelper.isAdmin,
  authHelper.bodyIsString,
  validateParty,
  middleware.createParties,
  controllers.createParties);


export default router;
