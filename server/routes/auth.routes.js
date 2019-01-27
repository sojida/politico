import express from 'express';
import middleware from '../middleware/auth.validation';
import controllers from '../controllers/auth.controllers';

const { createUser } = middleware;

const router = express.Router();


// register
router.post('/signup',
  middleware.validateRegister,
  middleware.isUserPresent,
  createUser,
  controllers.registerUser);

// login
router.post('/login',
  middleware.validateLogin,
  middleware.checkDetails,
  controllers.loginUser);


export default router;
