const mongoose = require("mongoose");
const Product = require("../models/product/products_schema");
const CACHE_KEY = "products_cache";
const redis = require("../config/redisClient");


// Create a new class
const createProduct = async (productData = {}) => {
  try {
    const normalizedData = {
      ...productData,
      imageurl: productData.imageurl || productData.imageUrl,
      categoryID: productData.categoryID ?? productData.categoryId,
    };
    const newProduct = new Product(normalizedData);
    await newProduct.save();
    await redis.del(CACHE_KEY);
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// Get all classes
const getAllProduct = async () => {
  try {
    // Check cache first
    const cachedData = await redis.get(CACHE_KEY); // ✅ Already parsed

    if (cachedData) {
      console.log("🟢 Retrieved from Redis cache");
      return cachedData; // ❌ DO NOT parse again
    }

    // If no cache, fetch from DB
    const products = await Product.find();

    // Store in Redis (with 1-hour expiry)
    await redis.set(CACHE_KEY, products, { ex: 3600 }); // ✅ No need to stringify

    console.log("🔵 Retrieved from MongoDB and cached");
    return products;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};


// Update a class by ID
const updateProduct = async (productID, updateData) => {
  try {
    if (!mongoose.isValidObjectId(productID)) {
      throw new Error("Invalid product ID");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      {
        ...updateData,
        ...(updateData.imageUrl ? { imageurl: updateData.imageUrl } : {}),
        ...(updateData.categoryId !== undefined ? { categoryID: updateData.categoryId } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    await redis.del(CACHE_KEY);
    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating Product: " + error.message);
  }
};

// Delete a class by ID
const deleteProduct = async (productID) => {
  try {
    if (!mongoose.isValidObjectId(productID)) {
      throw new Error("Invalid product ID");
    }

    const deletedProduct = await Product.findByIdAndDelete(productID);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    await redis.del(CACHE_KEY);
    return deletedProduct;
  } catch (error) {
    throw new Error("Error deleting Product: " + error.message);
  }
};




module.exports = {
  createProduct,
  creaProduct: createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
 
};
