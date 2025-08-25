import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        specialty: {
            type: [String],
            default: [],
        },
        experience: {
            type: Number,
        },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        profilePic: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

const Chef = mongoose.model('Chef', chefSchema);

export default Chef;
