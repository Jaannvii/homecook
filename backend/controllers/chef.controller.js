import Chef from '../models/Chef.model.js';

const getChefById = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        return res
            .status(201)
            .json({ message: 'Chef fetched successfully', chef });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while fetching chef',
            error: err.message,
        });
    }
};

const getChefProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const chef = await Chef.findOne({ userId: req.user._id });
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        return res
            .status(200)
            .json({ message: 'Profile fetched successfully', chef });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while fetching profile',
            error: err.message,
        });
    }
};

const updateChefProfile = async (req, res) => {
    try {
        const chef = await Chef.findOne({ userId: req.user._id });
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        chef.contactNumber = req.body.contactNumber || chef.contactNumber;
        chef.address = req.body.address || chef.address;

        const updatedChef = await chef.save();
        return res.status(201).json({
            message: 'Profile updated successfully',
            chef: updatedChef,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while updating profile',
            error: err.message,
        });
    }
};

const deleteChef = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        await chef.remove();
        return res.status(201).json({ message: 'Chef removed successfully' });
    } catch (err) {
        return res.status(500).json({
            message: 'Server error while deleting chef',
            error: err.message,
        });
    }
};

export { getChefById, getChefProfile, updateChefProfile, deleteChef };
