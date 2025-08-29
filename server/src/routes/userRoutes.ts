import express from 'express';
import { requestOtp, verifyOtp, googleAuth } from '../controllers/userController';

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google', googleAuth);
export default router;