const Realm = require("../models/reals/reals_schema"); // Adjust the path according to your file structure

const createRealm = async (RealmData) => {
  try {
    const newRealm = new Realm(RealmData);
    await newRealm.save();
    return newRealm;
  } catch (error) {
    throw new Error("Error creating realm: " + error.message);
  }
};

const getAllRealm = async () => {
  try {
    const realmree = await Realm.find()
  
    return realmree;
  } catch (error) {
    throw new Error("Error fetching : " + error.message);
  }
};


// Update a class by ID
const updateRealm = async (RealmId, updateData) => {
  try {
    const updatedRealm = await Realm.findByIdAndUpdate(RealmId, updateData, { new: true });
    if (!updatedRealm) {
      throw new Error(" not found");
    }
    return updatedRealm;
  } catch (error) {
    throw new Error("Error updating : " + error.message);
  }
};

// Delete a class by ID
const deleteRealm = async (RealmId) => {
  try {
    const deletedRealm = await Realm.findByIdAndDelete(RealmId);
    if (!deletedRealm) {
      throw new Error(" not found");
    }
    return deletedRealm;
  } catch (error) {
    throw new Error("Error deleting : " + error.message);
  }
};


const getRealmById = async (RealmId) => {
  try {
    const realmDet = await Realm.findById(RealmId)
    
    if (!realmDet) {
      throw new Error(" not found");
    }

    return realmDet;
  } catch (error) {
    throw new Error("Error fetching realm by ID: " + error.message);
  }
};




module.exports = {
    createRealm,
    getAllRealm,
  updateRealm,
  deleteRealm,
  getRealmById,
 
};
