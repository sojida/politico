import express from 'express';
import authMiddleware from '../middleware/auth.validation';
import uploadMiddleware from '../middleware/upload.middleware';

const router = express.Router();
router.post('/profile_pic',
  authMiddleware.verifyToken,
  uploadMiddleware.validateUpload,
  uploadMiddleware.updateUserPic);

export default router;
