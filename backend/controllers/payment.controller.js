import Payment from '../models/Payment.js';
import Order from '../models/Order.js';

const createPayment = async (req, res) => {
    try {
        const { orderId, amount, paymentMethod } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.customer.toString() !== req.user.id) {
            return res.status(403).json({
                message:
                    'You are not authorized to make payment for this order',
            });
        }

        const newPayment = new Payment({
            orderId,
            userId: req.user.id,
            amount,
            paymentMethod,
            status: 'Pending',
        });

        await newPayment.save();
        res.status(201).json({
            message: 'Payment created successfully',
            payment: newPayment,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while creating payment',
            error: err.message,
        });
    }
};

const getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user.id }).populate(
            'orderId',
            'totalPrice status'
        );
        res.status(201).json({
            message: 'Payments fetched successfully',
            payments,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching payments',
            error: err.message,
        });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate(
            'orderId',
            'totalPrice status'
        );
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });

        if (payment.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: 'You are not authorized to view this payment',
            });
        }

        res.status(201).json({
            message: 'Payment fetched successfully',
            payment,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching payment',
            error: err.message,
        });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { status, transactionId } = req.body;

        const payment = await Payment.findById(req.params.id);
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });

        if (req.user.role !== 'Admin') {
            return res
                .status(403)
                .json({ message: 'Not authorized to update payment status' });
        }

        payment.status = status || payment.status;
        payment.transactionId = transactionId || payment.transactionId;

        const updatedPayment = await payment.save();
        res.status(201).json({
            message: 'Payment status updated successfully',
            payment: updatedPayment,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while updating payment status',
            error: err.message,
        });
    }
};

const refundPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });

        if (req.user.role !== 'Admin') {
            return res
                .status(403)
                .json({ message: 'Not authorized to refund payment' });
        }

        payment.status = 'Refunded';
        const refundedPayment = await payment.save();

        res.status(201).json({
            message: 'Payment refunded successfully',
            payment: refundedPayment,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while refunding payment',
            error: err.message,
        });
    }
};

export {
    createPayment,
    getUserPayments,
    getPaymentById,
    updatePaymentStatus,
    refundPayment,
};
