import express from 'express';
import middleware from '../middleware/auth.validation';
import controllers from '../controllers/auth.controllers';
import authHelpers from '../helper/auth.helper';

const router = express.Router();


// register
router.post('/signup',
  authHelpers.bodyIsString,
  middleware.validateRegister,
  middleware.isUserPresent,
  middleware.createUser,
  controllers.registerUser);

// login
router.post('/login',
  authHelpers.bodyIsString,
  middleware.validateLogin,
  middleware.checkDetails,
  controllers.loginUser);


export default router;
