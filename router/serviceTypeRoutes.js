const express = require("express");
const router = express.Router();
const { Redis } = require("@upstash/redis");
const serviceType = require("../services/serviceTypeService");

// ---------------------
// Redis Setup
// ---------------------
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ---------------------
// Helper: Clear service-type cache
// ---------------------
const clearServiceTypeCache = async () => {
  const keys = await redis.keys("service_types*");
  if (keys.length) {
    await redis.del(...keys);
  }
};

// ---------------------
// Routes
// ---------------------

// Create a new service type
router.post("/create", async (req, res) => {
  try {
    const newServiceType = await serviceType.createServiceType(req.body);

    // Invalidate cache
    await clearServiceTypeCache();

    res.status(201).json(newServiceType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all service types
router.get("/getall", async (req, res) => {
  const cacheKey = "service_types_all";

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const serviceTypes = await serviceType.getAllServiceTypes();

    await redis.set(cacheKey, serviceTypes, { ex: 300 });
    res.status(200).json(serviceTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get service type by ID
router.get("/get/:serviceTypeId", async (req, res) => {
  const { serviceTypeId } = req.params;
  const cacheKey = `service_types_${serviceTypeId}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const serviceTypeData = await serviceType.getServiceTypeById(serviceTypeId);

    await redis.set(cacheKey, serviceTypeData, { ex: 300 });
    res.status(200).json(serviceTypeData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a service type by ID
router.put("/update/:serviceTypeId", async (req, res) => {
  const { serviceTypeId } = req.params;

  try {
    const updatedServiceType = await serviceType.updateServiceType(
      serviceTypeId,
      req.body
    );

    // Invalidate cache
    await clearServiceTypeCache();

    res.status(200).json(updatedServiceType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service type by ID
router.delete("/delete/:serviceTypeId", async (req, res) => {
  const { serviceTypeId } = req.params;

  try {
    const deletedServiceType = await serviceType.deleteServiceType(serviceTypeId);

    // Invalidate cache
    await clearServiceTypeCache();

    res.status(200).json(deletedServiceType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get active service types only
router.get("/active", async (req, res) => {
  const cacheKey = "service_types_active";

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const activeServiceTypes = await serviceType.getActiveServiceTypes();

    await redis.set(cacheKey, activeServiceTypes, { ex: 300 });
    res.status(200).json(activeServiceTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get service types by category
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const cacheKey = `service_types_category_${categoryId}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const serviceTypes = await serviceType.getServiceTypesByCategory(categoryId);

    await redis.set(cacheKey, serviceTypes, { ex: 300 });
    res.status(200).json(serviceTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
