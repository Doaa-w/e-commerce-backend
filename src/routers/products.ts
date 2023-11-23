import { Router } from 'express';


import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'

import { createProduct, getAllProducts, getSingleProductBySlug, deleteProductBySlug } from '../controller/products';

const router = Router()
router.get('/', getAllProducts)
router.get('/:slug', getSingleProductBySlug)
router.delete('/:slug', deleteProductBySlug)
router.post('/', createProduct)

export default router
