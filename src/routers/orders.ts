import express from 'express'
const router = express.Router()

import Order from '../models/order'
import User from '../models/user'
import { createOrder, getAllOrders } from '../controller/orders'

router.get('/',getAllOrders)


router.post('/', createOrder)

export default router
