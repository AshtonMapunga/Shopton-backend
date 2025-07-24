const Product = require("../models/product/products_schema"); // Adjust the path according to your file structure
const CACHE_KEY = "products_cache";
const redis = require("../config/redisClient");


// Create a new class
const creaProduct = async (productData) => {
  try {
    const newProduct = new Product(productData)
    await newProduct.save();
      await redis.del("products_cache");
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
    const updatedProduct = await Product.findByIdAndUpdate(productID, updateData, { new: true });

    if (!updatedProduct) {
      throw new Error("Product not found");
    }
      await redis.del("products_cache");
    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating Product: " + error.message);
  }
};

// Delete a class by ID
const deleteProduct = async (productID) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productID);
    if (!deletedProduct) {
      throw new Error("Banner not found");
    }
      await redis.del("products_cache");
    return deletedProduct;
  } catch (error) {
    throw new Error("Error deleting Product: " + error.message);
  }
};




module.exports = {
  creaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
 
};
