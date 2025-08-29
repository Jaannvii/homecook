import express from "express";
import {
    register, 
    login, 
    logout,
    getProfile,
    getUserRole
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);
router.get('/me',  isLoggedIn, getProfile);
router.get('/role/:id', isLoggedIn, getUserRole);


export default router;
