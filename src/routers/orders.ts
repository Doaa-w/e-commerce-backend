import { Router } from 'express' 

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updatedOrderById,
  deleteOrderById,
} from '../controller/orders'
// Middlewares
import { isLoggedIn, isAdmin } from '../middlewares/auth'

const router = Router()

router.get('/', isLoggedIn, isAdmin, getAllOrders)

router.get('/:id', isLoggedIn, getOrderById)

router.post('/', isLoggedIn, createOrder)

router.put('/:id', isLoggedIn, isAdmin, updatedOrderById)

router.delete('/:id', isLoggedIn, isAdmin, deleteOrderById)

export default router