import express from 'express';
import {
    createMenu,
    getMenus,
    getMenuById,
    getMenusByChef,
    updateMenu,
    deleteMenu,
} from '../controllers/menu.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.get('/chef/:chefId', getMenusByChef);
router.post('/create', isLoggedIn, authorize('Chef'), createMenu);
router.put('/update/:id', isLoggedIn, authorize('Chef', 'Admin'), updateMenu);
router.delete(
    '/delete/:id',
    isLoggedIn,
    authorize('Chef', 'Admin'),
    deleteMenu
);

export default router;
