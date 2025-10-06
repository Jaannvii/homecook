import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/auth.routes.js';
import menuRouter from './routes/menu.routes.js';
import chefRouter from './routes/chef.routes.js';
import orderRouter from './routes/order.routes.js';
import paymentRouter from './routes/payment.routes.js';
import adminRouter from './routes/admin.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: ['https://homecook-three.vercel.app', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

db();

app.use('/api/homecook/auth', userRouter);
app.use('/api/homecook/menu', menuRouter);
app.use('/api/homecook/chef', chefRouter);
app.use('/api/homecook/order', orderRouter);
app.use('/api/homecook/payment', paymentRouter);
app.use('/api/homecook/admin', adminRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
