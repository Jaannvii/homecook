import mongoose from 'mongoose';
import User from '../models/User.model.js';
import Chef from '../models/Chef.model.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long',
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
        });
        if (!user) {
            return res.status(400).json({ message: 'Error creating user' });
        }

        if (role === 'Chef') {
            const chef = await Chef.create({
                userId: user._id,
                name: name,
                contactNumber: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: '',
                },
                isVerified: false,
            });
            if (!chef) {
                return res
                    .status(400)
                    .json({ message: 'Error creating artisan profile' });
            }
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.verificationToken = token;
        await user.save();

        return res.status(201).json({
            message: `${name} registered successfully`,
            token,
            user,
        });
    } catch (err) {
        console.error('Error in register:', err);
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_Secret,
            {
                expiresIn: '7d',
            }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        };
        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error logging in user',
            error: err.message,
        });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
};

const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not Authenticated' });
        }
        return res.status(200).json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
            },
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const getUserRole = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        const user = await User.findById(id).select('role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ role: user.role });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Error fetching user role', error: err.message });
    }
};

export { register, login, logout, getProfile, getUserRole };
