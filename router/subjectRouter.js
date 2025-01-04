const express = require("express");
const router = express.Router();
const subjectService = require("../services/subjectServices"); // Adjust the path as per your project structure

// Create a new quiz
router.post("/create", async (req, res) => {
  try {
    const newSubject = await subjectService.createSubjects(req.body);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all subjects
router.get("/getall", async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Delete a quiz by ID
router.delete("/:subjectId", async (req, res) => {
  const { subjectId } = req.params;
  try {
    const deletedSubject = await subjectService.deleteSubject(subjectId);
    res.status(200).json(deletedSubject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});



module.exports = router;
