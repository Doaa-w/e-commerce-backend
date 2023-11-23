import { Router } from 'express';

import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'

import { createProduct, deleteProduct,  getAllProducts, getSingleProduct } from '../controller/products';

const router = Router()
router.get('/', getAllProducts)

router.get('/:id', getSingleProduct)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

export default router
