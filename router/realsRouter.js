const express = require("express");
const router = express.Router();
const realm = require("../services/realmService"); // Adjust the path as per your project structure

router.post("/create", async (req, res) => {
  try {
    const newReal = await realm.createRealm(req.body);
    res.status(201).json(newReal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all banners
router.get("/getall", async (req, res) => {
  try {
    const realmm = await realm.getAllRealm();
    res.status(200).json(realmm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:realmId", async (req, res) => {
  const { realmId } = req.params;
  try {
    const updatedRealm = await realm.updateRealm(realmId, req.body);
    res.status(200).json(updatedRealm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:realmId", async (req, res) => {
  const { realmId } = req.params;
  try {
    const deletedRealm = await realm.deleteRealm(realmId);
    res.status(200).json(deletedRealm);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
