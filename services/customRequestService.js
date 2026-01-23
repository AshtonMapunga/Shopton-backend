const CustomRequest = require("../models/custom_request/custom_request"); 

// Create a new custom request
const createCustomRequest = async (customRequestData) => {
  try {
    const newCustomRequest = new CustomRequest(customRequestData);
    await newCustomRequest.save();
    return newCustomRequest;
  } catch (error) {
    throw new Error("Error creating custom request: " + error.message);
  }
};

// Get all custom requests
const getAllCustomRequests = async () => {
  try {
    const customRequests = await CustomRequest.find()
      .populate("serviceType", "name image")
      .populate("userID", "name email");
    return customRequests;
  } catch (error) {
    throw new Error("Error fetching custom requests: " + error.message);
  }
};

// Get custom request by ID
const getCustomRequestById = async (requestId) => {
  try {
    const customRequest = await CustomRequest.findById(requestId)
      .populate("serviceType", "name image")
      .populate("userID", "name email phone");
    if (!customRequest) {
      throw new Error("Custom request not found");
    }
    return customRequest;
  } catch (error) {
    throw new Error("Error fetching custom request: " + error.message);
  }
};

// Get custom requests by user ID
const getCustomRequestsByUser = async (userId) => {
  try {
    const customRequests = await CustomRequest.find({ userID: userId })
    return customRequests;
  } catch (error) {
    throw new Error("Error fetching custom requests for user: " + error.message);
  }
};

// Get custom requests by service type
const getCustomRequestsByServiceType = async (serviceTypeId) => {
  try {
    const customRequests = await CustomRequest.find({ serviceType: serviceTypeId })
      .populate("userID", "name email")
      .sort({ createdAt: -1 });
    return customRequests;
  } catch (error) {
    throw new Error("Error fetching custom requests by service type: " + error.message);
  }
};

// Get custom requests by status
const getCustomRequestsByStatus = async (status) => {
  try {
    const customRequests = await CustomRequest.find({ status })
      .populate("serviceType", "name image")
      .populate("userID", "name email")
      .sort({ createdAt: -1 });
    return customRequests;
  } catch (error) {
    throw new Error("Error fetching custom requests by status: " + error.message);
  }
};

// Update a custom request by ID
const updateCustomRequest = async (requestId, updateData) => {
  try {
    const updatedCustomRequest = await CustomRequest.findByIdAndUpdate(
      requestId, 
      updateData, 
      { new: true, runValidators: true }
    )
    .populate("serviceType", "name image")
    .populate("userID", "name email");
    
    if (!updatedCustomRequest) {
      throw new Error("Custom request not found");
    }
    return updatedCustomRequest;
  } catch (error) {
    throw new Error("Error updating custom request: " + error.message);
  }
};

// Update custom request status
const updateCustomRequestStatus = async (requestId, status) => {
  try {
    const validStatuses = [
      "PENDING",
      "EXPERTS_REQUESTED",
      "QUOTED",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status value");
    }

    const updatedCustomRequest = await CustomRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true, runValidators: true }
    )
    .populate("serviceType", "name image")
    .populate("userID", "name email");
    
    if (!updatedCustomRequest) {
      throw new Error("Custom request not found");
    }
    return updatedCustomRequest;
  } catch (error) {
    throw new Error("Error updating custom request status: " + error.message);
  }
};

// Add images to custom request
const addImagesToCustomRequest = async (requestId, imageUrls) => {
  try {
    const customRequest = await CustomRequest.findById(requestId);
    if (!customRequest) {
      throw new Error("Custom request not found");
    }

    // Add new images to the array
    customRequest.imageUrls = [...customRequest.imageUrls, ...imageUrls];
    await customRequest.save();
    
    return customRequest.populate("serviceType", "name image");
  } catch (error) {
    throw new Error("Error adding images to custom request: " + error.message);
  }
};

// Delete a custom request by ID
const deleteCustomRequest = async (requestId) => {
  try {
    const deletedCustomRequest = await CustomRequest.findByIdAndDelete(requestId);
    if (!deletedCustomRequest) {
      throw new Error("Custom request not found");
    }
    return deletedCustomRequest;
  } catch (error) {
    throw new Error("Error deleting custom request: " + error.message);
  }
};

// Get urgent custom requests (ASAP urgency)
const getUrgentCustomRequests = async () => {
  try {
    const urgentRequests = await CustomRequest.find({ urgency: "ASAP" })
      .populate("serviceType", "name image")
      .populate("userID", "name email phone")
      .sort({ createdAt: -1 });
    return urgentRequests;
  } catch (error) {
    throw new Error("Error fetching urgent custom requests: " + error.message);
  }
};

// Search custom requests by description or location
const searchCustomRequests = async (searchQuery) => {
  try {
    const customRequests = await CustomRequest.find({
      $or: [
        { description: { $regex: searchQuery, $options: "i" } },
        { "location.address": { $regex: searchQuery, $options: "i" } },
        { "location.city": { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("serviceType", "name image")
      .populate("userID", "name email")
      .sort({ createdAt: -1 });
    
    return customRequests;
  } catch (error) {
    throw new Error("Error searching custom requests: " + error.message);
  }
};

module.exports = {
  createCustomRequest,
  getAllCustomRequests,
  getCustomRequestById,
  getCustomRequestsByUser,
  getCustomRequestsByServiceType,
  getCustomRequestsByStatus,
  updateCustomRequest,
  updateCustomRequestStatus,
  addImagesToCustomRequest,
  deleteCustomRequest,
  getUrgentCustomRequests,
  searchCustomRequests,
};