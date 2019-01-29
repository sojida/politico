import express from 'express';
import middleware from '../middleware/party.middleware';
import controllers from '../controllers/party.controllers';
import validateParty from '../middleware/party.validation';


const router = express.Router();

router.get('/parties',
  middleware.getAllParties,
  controllers.getAllParties);

router.get('/parties/:id',
  middleware.getPartiesById,
  controllers.getPartiesById);

router.patch('/parties/:id/name',
  middleware.editParties,
  controllers.editParties);

router.delete('/parties/:id',
  middleware.deleteParty,
  controllers.deleteParties);

router.post('/parties',
  validateParty,
  middleware.createParties,
  controllers.createParties);


export default router;
