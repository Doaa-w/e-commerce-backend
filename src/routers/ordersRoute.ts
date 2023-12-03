import { Router } from 'express';

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updatedOrderById,
  deleteOrderById,
} from '../controller/ordersController';

// Middlewares
import { isLoggedIn, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updatedOrderById);
router.delete('/:id', deleteOrderById);



export default router;