import express from 'express';
import {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    cancelOrder,
} from '../controllers/order.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', isLoggedIn, authorize('User'), createOrder);
router.get('/', isLoggedIn, authorize('User'), getUserOrders);
router.get('/:id', isLoggedIn, getOrderById);
router.get('/all', isLoggedIn, authorize('Admin'), getAllOrders);
router.put('/:id/status', isLoggedIn, authorize('Admin'), updateOrderStatus);
router.put('/:id/cancel', isLoggedIn, authorize('User'), cancelOrder);
router.delete('/delete/:id', isLoggedIn, authorize('Admin'), deleteOrder);

export default router;
