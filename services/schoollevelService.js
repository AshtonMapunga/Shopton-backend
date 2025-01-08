const SchLevel = require("../models/level/level_schema"); // Adjust the path according to your file structure

// Create a new class
const createLevel = async (bannerData) => {
  try {
    const newLevel = new SchLevel(bannerData);
    await newLevel.save();
    return newLevel;
  } catch (error) {
    throw new Error("Error creating level: " + error.message);
  }
};

// Get all classes
const getAllLevel = async () => {
  try {
    const levell = await SchLevel.find()
  
    return levell;
  } catch (error) {
    throw new Error("Error fetching Level: " + error.message);
  }
};


// Update a class by ID
const updateLevel = async (levelId, updateData) => {
  try {
    const updatedLevel = await SchLevel.findByIdAndUpdate(levelId, updateData, { new: true });
    if (!updatedLevel) {
      throw new Error("SchLevel not found");
    }
    return updatedLevel;
  } catch (error) {
    throw new Error("Error updating SchLevel: " + error.message);
  }
};

// Delete a class by ID
const deleteLevel = async (levelId) => {
  try {
    const deletedLevel = await SchLevel.findByIdAndDelete(levelId);
    if (!deletedLevel) {
      throw new Error("SchLevel not found");
    }
    return deletedLevel;
  } catch (error) {
    throw new Error("Error deleting SchLevel: " + error.message);
  }
};




module.exports = {
  createLevel,
  getAllLevel,
  updateLevel,
  deleteLevel,
 
};
