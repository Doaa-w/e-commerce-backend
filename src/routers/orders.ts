import express from 'express'
const router = express.Router()

import { createOrder, getAllOrders, deleteOrderBySlug, updateOrderBySlug, getOrderBySlug } from '../controller/orders'

router.get('/',getAllOrders)

router.post('/', createOrder)

router.delete('/:slug', deleteOrderBySlug)

router.post('/:slug', updateOrderBySlug)

router.get('/:slug', getOrderBySlug)


export default router