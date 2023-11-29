import { Router } from 'express';

import { getAllUsers, updateUserById, deleteUserById, register, activateUserAccount, getUserById, banUser } from '../controller/users';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', register);
router.post('/activate-account', activateUserAccount);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.put('/ban/:id', banUser);

export default router;