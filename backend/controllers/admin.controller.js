import Chef from '../models/Chef.model.js';
import Order from '../models/Order.model.js';

const getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.status(201).json({ message: 'Chefs fetched successfully', chefs });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching chefs',
            error: err.message,
        });
    }
};

const verifyChef = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        chef.isAvailable = req.body.isAvailable;
        const updatedChef = await chef.save();
        res.status(201).json({
            message: 'Chef verified successfully',
            chef: updatedChef,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while verifying chef',
            error: err.message,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email')
            .populate('items.food', 'itemName');
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

export { getAllChefs, verifyChef, getAllOrders };
