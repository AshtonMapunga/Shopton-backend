const express = require("express");
const router = express.Router();
const product = require("../services/productService"); 

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newProduct = await product.creaProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get("/getall", async (req, res) => {
  try {
    const products = await product.getAllProduct();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:productID", async (req, res) => {
  const { productID } = req.params;
  try {
    const updatedBanner = await product.updateProduct(productID, req.body);
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:productID", async (req, res) => {
  const { productID } = req.params;
  try {
    const deletedProduct = await product.deleteProduct(productID);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
