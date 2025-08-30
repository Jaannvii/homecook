import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} from '../controllers/order.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', isLoggedIn, authorize('User'), createOrder);
router.get('/', isLoggedIn, authorize('User'), getUserOrders);
router.get('/:id', isLoggedIn, getOrderById);
router.put(
    '/update/:id',
    isLoggedIn,
    authorize('Admin', 'Chef'),
    updateOrderStatus
);
router.delete('/delete/:id', isLoggedIn, authorize('Admin'), deleteOrder);

export default router;
