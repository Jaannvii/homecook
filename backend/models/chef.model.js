import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        contactNumber: {
            type: String,
            required: false,
            trim: true,
        },
        address: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
        },
        isVerified: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Chef = mongoose.model('Chef', chefSchema);

export default Chef;
