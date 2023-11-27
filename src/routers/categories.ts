import { Router } from 'express';
import { createCtegory, deleteCategory, getAllCategories, getSinglrCategory, updateCategory } from '../controller/categories';
import { categoryValidations } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';


const router = Router()

router.get('/', getAllCategories)

router.get('/:slug' , getSinglrCategory)

router.post('/',categoryValidations, runValidation, createCtegory )

router.delete('/:id' , deleteCategory)

router.put('/:id',categoryValidations, runValidation, updateCategory)

export default router