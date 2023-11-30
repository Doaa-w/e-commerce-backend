import { Router } from 'express';

import { createOrder, getAllOrders, deleteOrderBySlug, updateOrderBySlug, getOrderBySlug } from '../controller/orders';

const router = Router();

router.get('/', getAllOrders);
router.get('/:slug', getOrderBySlug);
router.post('/', createOrder);
router.delete('/:slug', deleteOrderBySlug);
router.put('/:slug', updateOrderBySlug);

export default router;