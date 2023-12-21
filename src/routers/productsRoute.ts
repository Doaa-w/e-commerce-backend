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
router.post('/',   upload.single('image'),  createSingleProduct)
router.put('/:slug',  upload.single('image'), updateProductValidation, runValidation, updateSingleProduct)
router.delete('/:slug',  deleteSingleProducts)

export default router
