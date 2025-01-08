const express = require("express");
const router = express.Router();
const banner = require("../services/bannerService"); // Adjust the path as per your project structure

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newBannner = await banner.createBanner(req.body);
    res.status(201).json(newBannner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all banners
router.get("/getall", async (req, res) => {
  try {
    const banners = await banner.getAllBanner();
    res.status(200).json(banners);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:bannerId", async (req, res) => {
  const { bannerId } = req.params;
  try {
    const updatedBanner = await banner.updateBanner(bannerId, req.body);
    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:bannerId", async (req, res) => {
  const { bannerId } = req.params;
  try {
    const deletedBanner = await banner.deleteBanner(bannerId);
    res.status(200).json(deletedBanner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
