const express = require("express");
const router = express.Router();
const { Redis } = require("@upstash/redis");
const banner = require("../services/bannerService");

// ---------------------
// Redis Setup
// ---------------------
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ---------------------
// Helper: Clear banner cache
// ---------------------
const clearBannerCache = async () => {
  const keys = await redis.keys("banners*");
  if (keys.length) {
    await redis.del(...keys);
  }
};

// ---------------------
// Routes
// ---------------------

// Create a new banner
router.post("/create", async (req, res) => {
  try {
    const newBanner = await banner.createBanner(req.body);

    // Invalidate cache
    await clearBannerCache();

    res.status(201).json(newBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all banners
router.get("/getall", async (req, res) => {
  const cacheKey = "banners_all";

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const banners = await banner.getAllBanner();

    await redis.set(cacheKey, banners, { ex: 300 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a banner by ID
router.put("/update/:bannerId", async (req, res) => {
  const { bannerId } = req.params;

  try {
    const updatedBanner = await banner.updateBanner(bannerId, req.body);

    // Invalidate cache
    await clearBannerCache();

    res.status(200).json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a banner by ID
router.delete("/delete/:bannerId", async (req, res) => {
  const { bannerId } = req.params;

  try {
    const deletedBanner = await banner.deleteBanner(bannerId);

    // Invalidate cache
    await clearBannerCache();

    res.status(200).json(deletedBanner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
