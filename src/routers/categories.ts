import { Router } from 'express';
import { getAllCategories } from '../controller/categories';
import { error } from 'console';

const router = Router()
router.get('/', getAllCategories)

// router.post('/', )

export default router