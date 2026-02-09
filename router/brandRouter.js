const express = require("express");
const router = express.Router();
const { Redis } = require("@upstash/redis");
const brand = require("../services/brandService");

// ---------------------
// Redis Setup
// ---------------------
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ---------------------
// Helper: Clear brand cache
// ---------------------
const clearBrandCache = async () => {
  const keys = await redis.keys("brands*");
  if (keys.length) {
    await redis.del(...keys);
  }
};

// ---------------------
// Routes
// ---------------------

// Create a new brand
router.post("/create", async (req, res) => {
  try {
    const newBrand = await brand.createBrand(req.body);

    // Invalidate cache
    await clearBrandCache();

    res.status(201).json(newBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all brands
router.get("/getall", async (req, res) => {
  const cacheKey = "brands_all";

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const brands = await brand.getAllBrand();

    await redis.set(cacheKey, brands, { ex: 300 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a brand by ID
router.put("/update/:brandID", async (req, res) => {
  const { brandID } = req.params;

  try {
    const updatedBrand = await brand.updateBrand(brandID, req.body);

    // Invalidate cache
    await clearBrandCache();

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a brand by ID
router.delete("/delete/:brandID", async (req, res) => {
  const { brandID } = req.params;

  try {
    const deletedBrand = await brand.deleteBrand(brandID);

    // Invalidate cache
    await clearBrandCache();

    res.status(200).json(deletedBrand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
