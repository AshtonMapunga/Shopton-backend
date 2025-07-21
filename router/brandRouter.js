const express = require("express");
const router = express.Router();
const brand = require("../services/brandService"); 

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newBrad = await brand.createBrand(req.body);
    res.status(201).json(newBrad);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all brands
router.get("/getall", async (req, res) => {
  try {
    const brands = await brand.getAllBrand();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:brandID", async (req, res) => {
  const { brandID } = req.params;
  try {
    const updatedBrand = await brand.updateBrand(brandID, req.body);
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:brandID", async (req, res) => {
  const { brandID } = req.params;
  try {
    const deletedBrand = await brand.deleteBrand(brandID);
    res.status(200).json(deletedBrand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
