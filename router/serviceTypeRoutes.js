const express = require("express");
const router = express.Router();
const serviceType = require("../services/serviceTypeService"); // Adjust the path as per your project structure

// Create a new service type
router.post("/create", async (req, res) => {
  try {
    const newServiceType = await serviceType.createServiceType(req.body);
    res.status(201).json(newServiceType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all service types
router.get("/getall", async (req, res) => {
  try {
    const serviceTypes = await serviceType.getAllServiceTypes();
    res.status(200).json(serviceTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get service type by ID
router.get("/get/:serviceTypeId", async (req, res) => {
  const { serviceTypeId } = req.params;
  try {
    const serviceTypeData = await serviceType.getServiceTypeById(serviceTypeId);
    res.status(200).json(serviceTypeData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a service type by ID
router.put("/update/:serviceTypeId", async (req, res) => {
  const { serviceTypeId } = req.params;
  try {
    const updatedServiceType = await serviceType.updateServiceType(serviceTypeId, req.body);
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
    res.status(200).json(deletedServiceType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get active service types only
router.get("/active", async (req, res) => {
  try {
    const activeServiceTypes = await serviceType.getActiveServiceTypes();
    res.status(200).json(activeServiceTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get service types by category
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const serviceTypes = await serviceType.getServiceTypesByCategory(categoryId);
    res.status(200).json(serviceTypes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;