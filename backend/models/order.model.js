import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Food',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: [
                'Pending',
                'Confirmed',
                'Cooking',
                'On the Way',
                'Delivered',
                'Cancelled',
            ],
            default: 'Pending',
        },
        paymentMethod: {
            type: String,
            enum: ['Card', 'UPI', 'NetBanking', 'Wallet', 'COD'],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
            default: 'Pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
