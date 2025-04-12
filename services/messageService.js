const Banner = require("../models/messages/messages_schema"); // Adjust the path according to your file structure

// Create a new class
const createMessage = async (messageData) => {
  try {
    const newBanner = new Banner(messageData);
    await newBanner.save();
    return newBanner;
  } catch (error) {
    throw new Error("Error creating banner: " + error.message);
  }
};

// Get all classes
const getAllMessages = async () => {
  try {
    const banneree = await Banner.find()
  
    return banneree;
  } catch (error) {
    throw new Error("Error fetching Messages: " + error.message);
  }
};


// Update a class by ID
const updateMessage = async (bannerId, updateData) => {
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
const deleteMesage = async (bannerId) => {
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
    createMessage,
    getAllMessages,
    updateMessage,
    deleteMesage,
 
};
