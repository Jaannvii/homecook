const mongoose = import("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Card", "UPI", "NetBanking", "Wallet", "COD"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    transactionId: {
      type: String, 
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

const user = mongoose.model("Payment", paymentSchema);

export default payment; 