import express from 'express';

import { getAllUsers, updateUserById, deleteUserById, register, activateUserAccount, getUserById, banUser, unbanUser } from '../controller/users';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/activate-account', activateUserAccount);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.put('/ban/:id', banUser);
router.put('/unban/:id', unbanUser);

export default router;