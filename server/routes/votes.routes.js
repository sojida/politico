import express from 'express';
import middleware from '../middleware/auth.validation';
import voteMiddleware from '../middleware/votes.middleware';
import voteControllers from '../controllers/votes.controllers';

const router = express.Router();

router.use(middleware.verifyToken);

router.post('/votes',
  voteMiddleware.validateVotes,
  voteMiddleware.createVotes,
  voteControllers.voteCandidate);

export default router;
