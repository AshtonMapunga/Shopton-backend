const Product = require("../models/product/products_schema"); // Adjust the path according to your file structure

// Create a new class
const creaProduct = async (productData) => {
  try {
    const newProduct = new Product(productData)
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// Get all classes
const getAllProduct = async () => {
  try {
    const banneree = await Product.find()
  
    return banneree;
  } catch (error) {
    throw new Error("Error fetching Product: " + error.message);
  }
};


// Update a class by ID
const updateProduct = async (productID, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productID, updateData, { new: true });
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
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
