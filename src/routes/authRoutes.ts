import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { verifyJwt } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyJwt, getProfile);

export default router;
