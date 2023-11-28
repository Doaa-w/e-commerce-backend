import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getSinglrCategory, updateCategory } from '../controller/categories';
import { categoryValidations } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';


const router = Router()

router.get('/', getAllCategories)

router.get('/:slug' , getSinglrCategory)

router.post('/',categoryValidations, runValidation, createCategory )

router.delete('/:slug' , deleteCategory)

router.put('/:slug',categoryValidations, runValidation, updateCategory)

export default router