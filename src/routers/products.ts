import { Router } from 'express';
import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'
<<<<<<< HEAD
import { createSingleProduct, deleteSingleProducts, getAllProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';
import { createProductValidation, updateProductValidation } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';
=======
import { createSingleProduct, deleteSingleProducts, getAllProducts, getSingleProductsBySlug, updateSingleProduct, getFilteredProducts} from '../controller/products';
>>>>>>> e31c2e8 ( add filter on products)


const router = Router()
router.get(`/`, getAllProducts)
router.get('/:slug', getSingleProductsBySlug)
router.post(`/`, createProductValidation,runValidation, createSingleProduct)
router.put(`/:slug`,updateProductValidation,runValidation, updateSingleProduct)
router.delete(`/:slug`, deleteSingleProducts)
router.get('/filtered-products', getFilteredProducts)

export default router
