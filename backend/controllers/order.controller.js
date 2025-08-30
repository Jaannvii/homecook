import Order from '../models/Order.js';

const createOrder = async (req, res) => {
    try {
        const { items, totalPrice, deliveryAddress, paymentMethod } = req.body;

        const newOrder = new Order({
            customer: req.user.id,
            items,
            totalPrice,
            deliveryAddress,
            paymentMethod,
        });

        await newOrder.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while creating order',
            error: err.message,
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).populate(
            'items.food',
            'itemName price'
        );
        res.status(201).json({
            message: 'Orders fetched successfully',
            orders,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching orders',
            error: err.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'items.food',
            'itemName price'
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.customer.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ message: 'You are not authorized to view this order' });
        }

        res.status(201).json({ message: 'Order fetched successfully', order });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching order',
            error: err.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (req.user.role !== 'Admin' && req.user.role !== 'Chef') {
            return res
                .status(403)
                .json({ message: 'Not authorized to update order status' });
        }

        order.status = status || order.status;

        const updatedOrder = await order.save();
        res.status(201).json({
            message: 'Order status updated successfully',
            order: updatedOrder,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while updating order status',
            error: err.message,
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (req.user.role !== 'Admin') {
            return res
                .status(403)
                .json({ message: 'Not authorized to delete this order' });
        }

        await order.deleteOne();
        res.status(201).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while deleting order',
            error: err.message,
        });
    }
};

export {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};
