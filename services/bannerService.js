const Banner = require("../models/banner/banner_schema"); // Adjust the path according to your file structure

// Create a new class
const createBanner = async (bannerData) => {
  try {
    const newBanner = new Banner(bannerData);
    await newBanner.save();
    return newBanner;
  } catch (error) {
    throw new Error("Error creating banner: " + error.message);
  }
};

// Get all classes
const getAllBanner = async () => {
  try {
    const banneree = await Banner.find()
  
    return banneree;
  } catch (error) {
    throw new Error("Error fetching Banner: " + error.message);
  }
};


// Update a class by ID
const updateBanner = async (bannerId, updateData) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(bannerId, updateData, { new: true });
    if (!updatedBanner) {
      throw new Error("Banner not found");
    }
    return updatedBanner;
  } catch (error) {
    throw new Error("Error updating Banner: " + error.message);
  }
};

// Delete a class by ID
const deleteBanner = async (bannerId) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(bannerId);
    if (!deletedBanner) {
      throw new Error("Banner not found");
    }
    return deletedBanner;
  } catch (error) {
    throw new Error("Error deleting Banner: " + error.message);
  }
};




module.exports = {
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
 
};
