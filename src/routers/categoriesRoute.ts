import { Router } from 'express';

import { createCategory, deleteCategory, getAllCategories, getSinglrCategory, updateCategory } from '../controller/categoriesController';
import { isAdmin, isLoggedIn } from '../middlewares/auth';

import { categoryValidations, updateCategoryValidations } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/',  getAllCategories);
router.get('/:slug',    getSinglrCategory);
router.post('/',   categoryValidations, runValidation, createCategory);
router.put('/:slug',  updateCategoryValidations, runValidation, updateCategory);
router.delete('/:slug',  deleteCategory);

export default router;