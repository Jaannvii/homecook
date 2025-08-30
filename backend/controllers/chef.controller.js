import Chef from '../models/Chef.js';

const getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find().select('-password');
        res.status(201).json({ message: 'Chefs fetched successfully', chefs });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching chefs',
            error: err.message,
        });
    }
};

const getChefById = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id).select('-password');
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        res.status(201).json({ message: 'Chef fetched successfully', chef });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching chef',
            error: err.message,
        });
    }
};

const getChefProfile = async (req, res) => {
    try {
        const chef = await Chef.findById(req.user.id).select('-password');
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        res.status(201).json({ message: 'Profile fetched successfully', chef });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while fetching profile',
            error: err.message,
        });
    }
};

const updateChefProfile = async (req, res) => {
    try {
        const chef = await Chef.findById(req.user.id);
        if (!chef) return res.status(404).json({ message: 'Chef not found' });

        chef.name = req.body.name || chef.name;
        chef.phone = req.body.phone || chef.phone;
        chef.specialty = req.body.specialty || chef.specialty;
        chef.experience = req.body.experience ?? chef.experience;
        chef.address = req.body.address || chef.address;
        chef.isAvailable = req.body.isAvailable ?? chef.isAvailable;
        chef.profilePic = req.body.profilePic || chef.profilePic;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            chef.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedChef = await chef.save();
        res.status(201).json({
            message: 'Profile updated successfully',
            _id: updatedChef._id,
            name: updatedChef.name,
            email: updatedChef.email,
            phone: updatedChef.phone,
            specialty: updatedChef.specialty,
            experience: updatedChef.experience,
            address: updatedChef.address,
            isAvailable: updatedChef.isAvailable,
            profilePic: updatedChef.profilePic,
            rating: updatedChef.rating,
        });
    } catch (err) {
        res.status(500).json({
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
        res.status(201).json({ message: 'Chef removed successfully' });
    } catch (err) {
        res.status(500).json({
            message: 'Server error while deleting chef',
            error: err.message,
        });
    }
};

export {
    getAllChefs,
    getChefById,
    getChefProfile,
    updateChefProfile,
    deleteChef,
};
