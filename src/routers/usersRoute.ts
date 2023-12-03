import { Router } from 'express';

import { getAllUsers, getUserById, register, activateUserAccount, updateUserById, deleteUserById, banUser } from '../controller/usersController';
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth';

const router = Router();

router.get('/', /*isLoggedIn, isAdmin,*/ getAllUsers);
router.get('/:id', isLoggedIn, getUserById);
router.post('/register', isLoggedOut, register);
router.post('/activate-account', isLoggedOut, activateUserAccount);
router.put('/:id', isLoggedIn, updateUserById);
router.delete('/:id', isLoggedIn, /*isAdmin,*/ deleteUserById);
router.put('/ban/:id', /*isLoggedIn, isAdmin,*/ banUser);

export default router;