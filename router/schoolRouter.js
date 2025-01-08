const express = require("express");
const router = express.Router();
const schoolService = require("../services/schoolServices"); // Adjust the path as per your project structure

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newSchool = await schoolService.createSchool(req.body);
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all schoollsss
router.get("/getall", async (req, res) => {
  try {
    const schoollsss = await schoolService.getAllSchools();
    res.status(200).json(schoollsss);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get class by ID
router.get("/getschoolbyid/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  try {
    const schoolDetails = await schoolService.getSchoolById(schoolId);
    res.status(200).json(schoolDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a class by ID
router.put("/updateschool/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  try {
    const updatedSchool = await schoolService.updateSchool(schoolId, req.body);
    res.status(200).json(updatedSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  try {
    const deletedSchool = await schoolService.deleteSchool(schoolId);
    res.status(200).json(deletedSchool);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
