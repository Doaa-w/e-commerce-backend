import { Router } from 'express';



import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'
import { createSingleProduct, deleteSingleProducts, getAllProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';

import { createProduct } from '../controller/products';

const router = Router()
router.get('/', getAllProducts)

router.post('/', createProduct)

export default router
