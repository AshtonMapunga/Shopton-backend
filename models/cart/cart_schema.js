const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageurl: { type: String, default: "" },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.methods.recalcTotal = function () {
  this.totalAmount = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

module.exports = mongoose.model("Cart", cartSchema);
