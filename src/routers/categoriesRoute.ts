import { Router } from 'express';

import { createCategory, deleteCategory, getAllCategories, getSinglrCategory, updateCategory } from '../controller/categoriesController';
import { isAdmin, isLoggedIn } from '../middlewares/auth';

import { categoryValidations, updateCategoryValidations } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';

const router = Router();

router.get('/', isLoggedIn, isAdmin, getAllCategories);
router.get('/:slug', isLoggedIn, isAdmin, getSinglrCategory);
router.post('/', isLoggedIn, isAdmin, categoryValidations, runValidation, createCategory);
router.put('/:slug', isLoggedIn, isAdmin, updateCategoryValidations, runValidation, updateCategory);
router.delete('/:slug', isLoggedIn, isAdmin, deleteCategory);

export default router;