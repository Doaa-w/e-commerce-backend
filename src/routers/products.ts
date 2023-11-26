import { Router } from 'express';
import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'
import { createSingleProduct, deleteSingleProducts, getAllProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';


const router = Router()
router.get(`/`, getAllProducts)
router.get('/:slug', getSingleProductsBySlug)
router.post(`/`, createSingleProduct)
router.put(`/:slug`, updateSingleProduct)
router.delete(`/:slug`, deleteSingleProducts)

export default router
