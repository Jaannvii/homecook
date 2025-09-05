import Menu from '../models/Menu.model.js';

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

        const newMenu = new Menu({
            itemName,
            description,
            price,
            category,
            isAvailable,
            imageUrl,
            chefId: req.user.id,
        });

        await newMenu.save();
        res.status(201).json({
            message: 'Menu created successfully',
            menu: newMenu,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while creating menu',
            error: err.message,
        });
    }
};

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().populate('chefId', 'name email');
        res.status(201).json({ message: 'Menus fetched successfully', menus });
    } catch (err) {
        res.status(500).json({
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

        res.status(201).json({ message: 'Menu fetched successfully', menu });
    } catch (err) {
        res.status(500).json({
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

        res.status(201).json({ message: 'Menus fetched successfully', menus });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
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
        res.status(201).json({
            message: 'Menu updated successfully',
            menu: updatedMenu,
        });
    } catch (err) {
        res.status(500).json({
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
        res.status(201).json({ message: 'Menu removed successfully' });
    } catch (err) {
        res.status(500).json({
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
    updateMenu,
    deleteMenu,
};
