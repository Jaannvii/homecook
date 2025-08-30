import express from 'express';
import {
    createPayment,
    getUserPayments,
    getPaymentById,
    updatePaymentStatus,
    refundPayment,
} from '../controllers/payment.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', isLoggedIn, authorize('User'), createPayment);
router.get('/', isLoggedIn, authorize('User'), getUserPayments);
router.get('/:id', isLoggedIn, getPaymentById);
router.put('/status/:id', isLoggedIn, authorize('Admin'), updatePaymentStatus);
router.put('/refund/:id', isLoggedIn, authorize('Admin'), refundPayment);

export default router;
