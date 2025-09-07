import express from 'express';
import {
    createMenu,
    getMenus,
    getMenuById,
    getMenusByChef,
    getCategories,
    updateMenu,
    deleteMenu,
} from '../controllers/menu.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getMenus);
router.get('/chef/:chefId', getMenusByChef);
router.get('/:id', getMenuById);
router.post('/create', isLoggedIn, authorize('Chef'), createMenu);
router.get('/categories', getCategories);
router.put('/update/:id', isLoggedIn, authorize('Chef'), updateMenu);
router.delete('/delete/:id', isLoggedIn, authorize('Admin'), deleteMenu);

export default router;
