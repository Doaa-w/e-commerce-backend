import { Router } from 'express'

import {
  createSingleProduct,
  deleteSingleProducts,
  getAllProducts,
  getFilteredProducts,
  getSingleProductById,
  updateSingleProduct,
} from '../controller/productsController'
import { upload } from '../middlewares/uploadFile'

import { isAdmin, isLoggedIn } from '../middlewares/auth'
import { ProductValidation, updateProductValidation } from '../validation/vaildations'
import { runValidation } from '../validation/runValidation'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getSingleProductById)
router.get('/filtered-products', getFilteredProducts)
router.post('/', isLoggedIn, isAdmin, upload.single('image'), ProductValidation, runValidation, createSingleProduct)
router.put('/:slug', isLoggedIn, isAdmin, upload.single('image'), updateProductValidation, runValidation, updateSingleProduct)
router.delete('/:slug', isLoggedIn, isAdmin, deleteSingleProducts)

export default router
