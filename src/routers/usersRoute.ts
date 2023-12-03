import { Router } from 'express';

import { getAllUsers, getUserById, register, activateUserAccount, updateUserById, deleteUserById, banUser } from '../controller/usersController';
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth';
import { updateUserValidation, userValidation } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/', isLoggedIn, isAdmin, getAllUsers);
router.get('/:id', isLoggedIn, getUserById);
router.post('/register', isLoggedOut, userValidation, runValidation, register);
router.post('/activate-account', isLoggedOut, activateUserAccount);
router.put('/:id', isLoggedIn, updateUserValidation, runValidation, updateUserById);
router.delete('/:id', isLoggedIn, isAdmin, deleteUserById);
router.put('/ban/:id', isLoggedIn, isAdmin, banUser);

export default router;