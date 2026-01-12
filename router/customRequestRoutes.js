const express = require("express");
const router = express.Router();
const customRequestService = require("../services/customRequestService"); 

// Create a new custom request
router.post("/create", async (req, res) => {
  try {
    const newCustomRequest = await customRequestService.createCustomRequest(req.body);
    res.status(201).json(newCustomRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all custom requests
router.get("/getall", async (req, res) => {
  try {
    const customRequests = await customRequestService.getAllCustomRequests();
    res.status(200).json(customRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get custom request by ID
router.get("/get/:requestId", async (req, res) => {
  const { requestId } = req.params;
  try {
    const customRequest = await customRequestService.getCustomRequestById(requestId);
    res.status(200).json(customRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get custom requests by user ID
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const customRequests = await customRequestService.getCustomRequestsByUser(userId);
    res.status(200).json(customRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get custom requests by service type
router.get("/servicetype/:serviceTypeId", async (req, res) => {
  const { serviceTypeId } = req.params;
  try {
    const customRequests = await customRequestService.getCustomRequestsByServiceType(serviceTypeId);
    res.status(200).json(customRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get custom requests by status
router.get("/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const customRequests = await customRequestService.getCustomRequestsByStatus(status);
    res.status(200).json(customRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a custom request by ID
router.put("/update/:requestId", async (req, res) => {
  const { requestId } = req.params;
  try {
    const updatedCustomRequest = await customRequestService.updateCustomRequest(requestId, req.body);
    res.status(200).json(updatedCustomRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update custom request status
router.patch("/update-status/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  
  try {
    const updatedCustomRequest = await customRequestService.updateCustomRequestStatus(requestId, status);
    res.status(200).json(updatedCustomRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add images to custom request
router.patch("/add-images/:requestId", async (req, res) => {
  const { requestId } = req.params;
  const { imageUrls } = req.body;
  
  if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
    return res.status(400).json({ message: "Image URLs array is required" });
  }
  
  try {
    const updatedCustomRequest = await customRequestService.addImagesToCustomRequest(requestId, imageUrls);
    res.status(200).json(updatedCustomRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a custom request by ID
router.delete("/delete/:requestId", async (req, res) => {
  const { requestId } = req.params;
  try {
    const deletedCustomRequest = await customRequestService.deleteCustomRequest(requestId);
    res.status(200).json(deletedCustomRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get urgent custom requests
router.get("/urgent", async (req, res) => {
  try {
    const urgentRequests = await customRequestService.getUrgentCustomRequests();
    res.status(200).json(urgentRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search custom requests
router.get("/search", async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }
  
  try {
    const searchResults = await customRequestService.searchCustomRequests(q);
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get custom requests with filters (multiple parameters)
router.get("/filter", async (req, res) => {
  try {
    const { 
      userId, 
      serviceTypeId, 
      status, 
      urgency, 
      minBudget, 
      maxBudget 
    } = req.query;
    
    let query = {};
    
    if (userId) query.userID = userId;
    if (serviceTypeId) query.serviceType = serviceTypeId;
    if (status) query.status = status;
    if (urgency) query.urgency = urgency;
    
    // Budget filtering
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.min = { $gte: Number(minBudget) };
      if (maxBudget) query.budget.max = { $lte: Number(maxBudget) };
    }
    
    const filteredRequests = await CustomRequest.find(query)
      .populate("serviceType", "name image")
      .populate("userID", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json(filteredRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;