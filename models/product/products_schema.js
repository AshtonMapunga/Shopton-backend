const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },

    images: [{ type: String }],
    imageurl: { type: String, required: true },

    categoryID: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, default: "" },
    tags: [{ type: String }],

    stock: { type: Number, required: true, default: 0, min: 0 },
    sku: { type: String, unique: true, sparse: true },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
