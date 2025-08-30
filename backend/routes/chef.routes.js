import express from 'express';
import {
    getAllChefs,
    getChefById,
    getChefProfile,
    updateChefProfile,
    deleteChef,
} from '../controllers/chef.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllChefs);
router.get('/:id', getChefById);
router.get('/profile', isLoggedIn, authorize('Chef'), getChefProfile);
router.put('/update/:id', isLoggedIn, authorize('Chef'), updateChefProfile);
router.delete(
    '/delete/:id',
    isLoggedIn,
    authorize('Chef', 'Admin'),
    deleteChef
);

export default router;
