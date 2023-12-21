import { Router } from 'express';

import { getAllUsers, getUserById, register, activateUserAccount, updateUserById, deleteUserById, banUser } from '../controller/usersController';
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth';
import { updateUserValidation, userValidation } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/',    getAllUsers);
router.get('/:id', getUserById);
router.post('/register',  isLoggedOut,  userValidation, runValidation, register);
router.post('/activate-account',  isLoggedOut, activateUserAccount);
router.put('/:id', updateUserValidation, runValidation, updateUserById);
router.delete('/:id',  deleteUserById);
router.put('/ban/:id', banUser);

export default router;