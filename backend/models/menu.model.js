import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            enum: [
                'Breakfast',
                'Lunch',
                'Dinner',
                'Snacks',
                'Dessert',
                'Beverages',
            ],
            required: true,
        },
        imageUrl: {
            type: String,
        },
        chefId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chef',
            required: true,
        },
    },
    { timestamps: true }
);

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
