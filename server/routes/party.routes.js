import express from 'express';
import middleware from '../middleware/party.middleware';
import controllers from '../controllers/party.controllers';


const router = express.Router();

router.get('/parties',
  middleware.getAllParties,
  controllers.getAllParties);

export default router;
