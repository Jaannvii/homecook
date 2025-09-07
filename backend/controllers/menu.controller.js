import Menu from '../models/Menu.model.js';
import Chef from '../models/Chef.model.js';

const createMenu = async (req, res) => {
    try {
        const {
            itemName,
            description,
            price,
            category,
            isAvailable,
            imageUrl,
        } = req.body;

        const chef = await Chef.findOne({ userId: req.user._id });
        if (!chef) {
            return res.status(400).json({ message: 'Chef profile not found' });
        }

        if (!chef.name || !chef.contactNumber || !chef.address) {
            return res.status(400).json({
                message:
                    'Chef profile is incomplete. Please update your profile before creating menu.',
            });
        }

        if (!chef.isVerified) {
            return res.status(403).json({
                message: 'Chef is not verified. Cannot create menu.',
            });
        }

        if (!itemName || price === undefined || !category) {
            return res
                .status(400)
                .json({ message: 'Name, price and category are required' });
        }

        if (typeof price !== 'number' || price < 0) {
            return res
                .status(400)
                .json({ message: 'Price must be a non-negative number' });
        }

        if (imageUrl && !imageUrl.startsWith('http')) {
            return res
                .status(400)
                .json({ message: 'Image URL should be valid' });
        }

        const newMenu = new Menu({
            itemName,
            description,
            price,
            category,
            isAvailable: isAvailable ?? true,
            imageUrl,
            chefId: chef._id,
            isApproved: false,
        });

        await newMenu.save();
        return res.status(201).json({
            message: 'Menu created successfully',
            menu: newMenu,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while creating menu',
            error: err.message,
        });
    }
};

const getMenus = async (req, res) => {
    try {
        const filter = { isApproved: true };
        if (req.user?._id && req.user.role === 'Chef') {
            const chef = await Chef.findOne({ userId: req.user._id });
            if (!chef) {
                return res.status(400).json({ message: 'Chef not found' });
            }
            filter.chefId = chef._id;
        }

        const menus = await Menu.find(filter).populate('chefId', 'name email');
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

const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate(
            'chefId',
            'name email'
        );
        if (!menu) return res.status(404).json({ message: 'Menu not found' });

        return res
            .status(201)
            .json({ message: 'Menu fetched successfully', menu });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while fetching menu',
            error: err.message,
        });
    }
};

const getMenusByChef = async (req, res) => {
    try {
        const { chefId } = req.params;

        const menus = await Menu.find({ chefId });

        if (!menus || menus.length === 0) {
            return res
                .status(404)
                .json({ message: 'No menus found for this chef' });
        }

        return res
            .status(201)
            .json({ message: 'Menus fetched successfully', menus });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Menu.aggregate([
            { $match: { isApproved: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({
            message: 'Error fetching categories',
            error: err.message,
        });
    }
};

const updateMenu = async (req, res) => {
    try {
        const {
            itemName,
            description,
            price,
            category,
            isAvailable,
            imageUrl,
        } = req.body;

        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });

        if (
            menu.chefId.toString() !== req.user.id &&
            req.user.role !== 'Admin'
        ) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        menu.itemName = itemName || menu.itemName;
        menu.description = description || menu.description;
        menu.price = price ?? menu.price;
        menu.category = category || menu.category;
        menu.isAvailable = isAvailable ?? menu.isAvailable;
        menu.imageUrl = imageUrl || menu.imageUrl;

        const updatedMenu = await menu.save();
        return res.status(201).json({
            message: 'Menu updated successfully',
            menu: updatedMenu,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while updating menu',
            error: err.message,
        });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });

        if (
            menu.chefId.toString() !== req.user.id &&
            req.user.role !== 'Admin'
        ) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await menu.deleteOne();
        return res.status(201).json({ message: 'Menu removed successfully' });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while deleting menu',
            error: err.message,
        });
    }
};

export {
    createMenu,
    getMenus,
    getMenusByChef,
    getMenuById,
    getCategories,
    updateMenu,
    deleteMenu,
};
