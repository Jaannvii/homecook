import express from 'express';
import {
    getAllChefs,
    verifyChef,
    getAllOrders,
} from '../controllers/admin.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.put('/verify-chef/:id', isLoggedIn, authorize('Admin'), verifyChef);
router.get('/chefs', isLoggedIn, authorize('Admin'), getAllChefs);
router.get('/orders', isLoggedIn, authorize('Admin'), getAllOrders);

export default router;
