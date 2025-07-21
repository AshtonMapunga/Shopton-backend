const Brand = require("../models/brands/brands_schema"); // Adjust the path according to your file structure

const createBrand = async (brandData) => {
  try {
    const newBrand = new Brand(brandData)
    await newBrand.save();
    return newBrand;
  } catch (error) {
    throw new Error("Error creating brand: " + error.message);
  }
};

const getAllBrand = async () => {
  try {
    const brandd = await Brand.find()
  
    return brandd;
  } catch (error) {
    throw new Error("Error fetching brand: " + error.message);
  }
};


const updateBrand = async (brandID, updateData) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(brandID, updateData, { new: true });
    if (!updatedBrand) {
      throw new Error("Brand not found");
    }
    return updatedBrand;
  } catch (error) {
    throw new Error("Error updating Brand: " + error.message);
  }
};

const deleteBrand = async (brandID) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandID);
    if (!deletedBrand) {
      throw new Error("Brand not found");
    }
    return deletedBrand;
  } catch (error) {
    throw new Error("Error deleting Brand: " + error.message);
  }
};




module.exports = {
  createBrand,
  getAllBrand,
  updateBrand,
  deleteBrand,
 
};
