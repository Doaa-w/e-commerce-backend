import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import { login, logout } from '../controller/auth';
import { isLoggedOut } from '../middlewares/auth';

const router = Router();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 7,
    message: 'You have reached maximum request, please try after 5 minutes'
});

router.post('/login', limiter, isLoggedOut, login);
router.post('/logout', logout);

export default router;