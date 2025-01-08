const express = require("express");
const router = express.Router();
const Level = require("../services/schoollevelService"); // Adjust the path as per your project structure

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newLevel = await Level.createLevel(req.body);
    res.status(201).json(newLevel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all banners
router.get("/getall", async (req, res) => {
  try {
    const level = await Level.getAllLevel();
    res.status(200).json(level);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:levelId", async (req, res) => {
  const { levelId } = req.params;
  try {
    const updatedLevel = await Level.updateLevel(levelId, req.body);
    res.status(200).json(updatedLevel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:levelId", async (req, res) => {
  const { levelId } = req.params;
  try {
    const deletedBanner = await Level.deleteLevel(levelId);
    res.status(200).json(deletedBanner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
