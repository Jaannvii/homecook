import express from 'express';
import {
    getAllChefs,
    verifyChef,
    approveMenu,
    getAllOrders,
} from '../controllers/admin.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.put('/verify-chef/:chefId', isLoggedIn, authorize('Admin'), verifyChef);
router.put(
    '/approve-menu/:menuId',
    isLoggedIn,
    authorize('Admin'),
    approveMenu
);
router.get('/chefs', isLoggedIn, authorize('Admin'), getAllChefs);
router.get('/orders', isLoggedIn, authorize('Admin'), getAllOrders);

export default router;
