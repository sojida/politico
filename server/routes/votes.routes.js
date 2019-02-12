import express from 'express';
import voteMiddleware from '../middleware/votes.middleware';
import voteControllers from '../controllers/votes.controllers';
import authMiddleware from '../middleware/auth.validation';
import authHelpers from '../helper/auth.helper';


const router = express.Router();


router.post('/votes',
  authMiddleware.verifyToken,
  authHelpers.bodyIsNumber,
  voteMiddleware.validateVotes,
  voteMiddleware.createVotes,
  voteControllers.voteCandidate);

router.get('/user_votes',
  authMiddleware.verifyToken,
  voteMiddleware.getUserVotes,
  voteControllers.getUserVotes);

export default router;
