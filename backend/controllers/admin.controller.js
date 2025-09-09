import Chef from '../models/Chef.model.js';
import Order from '../models/Order.model.js';
import Menu from '../models/Menu.model.js';

const getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find();
        return res
            .status(201)
            .json({ message: 'Chefs fetched successfully', chefs });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while fetching chefs',
            error: err.message,
        });
    }
};

const verifyChef = async (req, res) => {
    try {
        const chefId = req.params.chefId;
        const chef = await Chef.findById(chefId);
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        chef.isVerified = true;
        await chef.save();
        return res.status(200).json({
            message: 'Chef verified successfully',
            chef,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error',
            error: err.message,
        });
    }
};

const getAllMenu = async (req, res) => {
    try {
        const menus = await Menu.find().populate('chefId', 'name email');
        return res
            .status(200)
            .json({ message: 'Menus fetched successfully', menus });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while fetching menus',
            error: err.message,
        });
    }
};

const approveMenu = async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const menu = await Menu.findById(menuId);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        menu.isApproved = true;
        await menu.save();
        return res.status(200).json({ message: 'Menu approved', menu });
    } catch (err) {
        console.error('Error approving menu:', err);
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email')
            .populate('items.food', 'itemName');
        return res.status(201).json({
            message: 'Orders fetched successfully',
            orders,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while fetching orders',
            error: err.message,
        });
    }
};

export { getAllChefs, verifyChef, getAllMenu, approveMenu, getAllOrders };
