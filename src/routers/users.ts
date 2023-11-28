import express from 'express';

import { getAllUsers, updateUserById, deleteUserById, register, activateUserAccount, getUserById } from '../controller/users';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/activate-account', activateUserAccount);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;