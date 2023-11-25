import { Router } from 'express';
import { createCtegory, deleteCategory, getAllCategories, getSinglrCategory, updateCategory } from '../controller/categories';


const router = Router()

router.get('/', getAllCategories)

router.get('/:slug' , getSinglrCategory)

router.post('/', createCtegory )

router.delete('/:id' , deleteCategory)

router.put('/:id', updateCategory)

export default router