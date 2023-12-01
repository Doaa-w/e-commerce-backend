import { Router } from 'express';

import { login, logout } from '../controller/auth';
import { isLoggedOut } from '../middlewares/auth';

const router = Router();

router.post('/login', isLoggedOut, login);
router.post('/logout', logout);

export default router;