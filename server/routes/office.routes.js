import express from 'express';
import middleware from '../middleware/office.middleware';
import controllers from '../controllers/office.controllers';

const router = express.Router();

// offices
router.get('/offices',
  middleware.getAllOffices,
  controllers.getAllOffices);

export default router;
