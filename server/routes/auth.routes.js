import express from 'express';
import middleware from '../middleware/auth.validation';
import controllers from '../controllers/auth.controllers';
import authHelpers from '../helper/auth.helper';
import passReset from '../middleware/reset.middleware';

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

// reset pass
router.post('/reset',
  authHelpers.bodyIsString,
  passReset.validateEmail,
  passReset.checkForEmail,
  passReset.createToken,
  passReset.mailer);

router.get('/reset/:token/password',
  passReset.validateToken,
  passReset.acceptRequest);

router.post('/new_password',
  authHelpers.bodyIsString,
  passReset.validatePassword,
  passReset.verifyEmailToken,
  passReset.isNotOldPassword,
  passReset.updatePassword);


export default router;
