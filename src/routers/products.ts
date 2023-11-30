import { Router } from 'express';
import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'
import { createSingleProduct, deleteSingleProducts, getAllProducts, getSingleProductsBySlug, updateSingleProduct } from '../controller/products';
import { createProductValidation, updateProductValidation } from '../validation/vaildations';
import { runValidation } from '../validation/runValidation';


const router = Router()
router.get(`/`, getAllProducts)
router.get('/:slug', getSingleProductsBySlug)
router.post(`/`, createProductValidation, runValidation, createSingleProduct)
router.put(`/:slug`,updateProductValidation, runValidation, updateSingleProduct)
router.delete(`/:slug`, deleteSingleProducts)

export default router
