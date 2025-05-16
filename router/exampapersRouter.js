const express = require("express");
const router = express.Router();
const examppr = require("../services/exampapersServices"); // Adjust the path as per your project structure



// Get all banners
router.get("/getall", async (req, res) => {
  try {
    const exampprs = await examppr.getAllExamPapers();
    res.status(200).json(exampprs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post("/create", async (req, res) => {
  try {
    const exampr = await examppr.createExamPaper(req.body);
    res.status(201).json(exampr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:exampaperId", async (req, res) => {
  const { exampaperId } = req.params;
  try {
    const updatedEP = await examppr.updateEP(exampaperId, req.body);
    res.status(200).json(updatedEP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:exampaperId", async (req, res) => {
  const { exampaperId } = req.params;
  try {
    const deletedEP = await examppr.deleteEP(exampaperId);
    res.status(200).json(deletedEP);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});



module.exports = router;
