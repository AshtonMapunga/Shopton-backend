const ServiceType = require("../models/service_type/service_type_schema");

// Create a new service type
const createServiceType = async (serviceTypeData) => {
  try {
    const newServiceType = new ServiceType(serviceTypeData);
    await newServiceType.save();
    return newServiceType;
  } catch (error) {
    throw new Error("Error creating service type: " + error.message);
  }
};

// Get all service types
const getAllServiceTypes = async () => {
  try {
    const serviceTypes = await ServiceType.find();
    return serviceTypes;
  } catch (error) {
    throw new Error("Error fetching service types: " + error.message);
  }
};

// Get service type by ID
const getServiceTypeById = async (serviceTypeId) => {
  try {
    const serviceType = await ServiceType.findById(serviceTypeId);
    if (!serviceType) {
      throw new Error("Service type not found");
    }
    return serviceType;
  } catch (error) {
    throw new Error("Error fetching service type: " + error.message);
  }
};

// Update a service type by ID
const updateServiceType = async (serviceTypeId, updateData) => {
  try {
    const updatedServiceType = await ServiceType.findByIdAndUpdate(
      serviceTypeId, 
      updateData, 
      { new: true }
    );
    if (!updatedServiceType) {
      throw new Error("Service type not found");
    }
    return updatedServiceType;
  } catch (error) {
    throw new Error("Error updating service type: " + error.message);
  }
};

// Delete a service type by ID
const deleteServiceType = async (serviceTypeId) => {
  try {
    const deletedServiceType = await ServiceType.findByIdAndDelete(serviceTypeId);
    if (!deletedServiceType) {
      throw new Error("Service type not found");
    }
    return deletedServiceType;
  } catch (error) {
    throw new Error("Error deleting service type: " + error.message);
  }
};

// Get active service types only
const getActiveServiceTypes = async () => {
  try {
    const serviceTypes = await ServiceType.find({ isActive: true });
    return serviceTypes;
  } catch (error) {
    throw new Error("Error fetching active service types: " + error.message);
  }
};

// Get service types by category
const getServiceTypesByCategory = async (categoryId) => {
  try {
    const serviceTypes = await ServiceType.find({ 
      serviceTypeCategory: categoryId,
      isActive: true 
    });
    return serviceTypes;
  } catch (error) {
    throw new Error("Error fetching service types by category: " + error.message);
  }
};

module.exports = {
  createServiceType,
  getAllServiceTypes,
  getServiceTypeById,
  updateServiceType,
  deleteServiceType,
  getActiveServiceTypes,
  getServiceTypesByCategory,
};