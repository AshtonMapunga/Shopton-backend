const School = require("../models/schools/schools_schema"); // Adjust the path according to your file structure

// Create a new class
const createSchool = async (schoolData) => {
  try {
    const newSchool = new School(schoolData);
    await newSchool.save();
    return newSchool;
  } catch (error) {
    throw new Error("Error creating Schoolss: " + error.message);
  }
};

// Get all classes
const getAllSchools = async () => {
  try {
    const Schoolss = await School.find()
  
    return Schoolss;
  } catch (error) {
    throw new Error("Error fetching Schools: " + error.message);
  }
};

// Get class by ID
const getSchoolById = async (schoolId) => {
  try {
    const schoolDetails = await School.findById(schoolId)
      
    if (!schoolDetails) {
      throw new Error("School not found");
    }

    return schoolDetails;
  } catch (error) {
    throw new Error("Error fetching School by ID: " + error.message);
  }
};

// Update a class by ID
const updateSchool = async (schoolId, updateData) => {
  try {
    const updatedSchool = await School.findByIdAndUpdate(schoolId, updateData, { new: true });
    if (!updatedSchool) {
      throw new Error("School not found");
    }
    return updatedSchool;
  } catch (error) {
    throw new Error("Error updating School: " + error.message);
  }
};

// Delete a class by ID
const deleteSchool = async (schoolId) => {
  try {
    const deletedSchool = await School.findByIdAndDelete(schoolId);
    if (!deletedSchool) {
      throw new Error("School not found");
    }
    return deletedSchool;
  } catch (error) {
    throw new Error("Error deleting school: " + error.message);
  }
};




module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
 
};
