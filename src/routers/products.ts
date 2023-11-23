import { Router } from 'express';

import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'

import { createProduct, deleteProduct, getAllProducts } from '../controller/products';

const router = Router()
router.get('/', getAllProducts)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

export default router
