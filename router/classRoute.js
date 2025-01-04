const express = require("express");
const router = express.Router();
const classService = require("../services/classServices"); // Adjust the path as per your project structure

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all classes
router.get("/getall", async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get class by ID
router.get("/getclassbyid/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const classDetails = await classService.getClassById(classId);
    res.status(200).json(classDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a class by ID
router.put("/updateclass/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const updatedClass = await classService.updateClass(classId, req.body);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const deletedClass = await classService.deleteClass(classId);
    res.status(200).json(deletedClass);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Add a student to a class
router.post("/addstudenttoclass/:classId/students/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;
  try {
    const updatedClass = await classService.addStudentToClass(classId, studentId);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a student from a class
router.delete("/removestudentfromclass/:classId/students/:studentId", async (req, res) => {
  const { classId, studentId } = req.params;
  try {
    const updatedClass = await classService.removeStudentFromClass(classId, studentId);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a timetable entry to a class
router.post("/addtimetabletoclass/:classId/timetable", async (req, res) => {
  const { classId } = req.params;
  const timetableEntry = req.body;
  try {
    const updatedClass = await classService.addTimetableEntry(classId, timetableEntry);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a timetable entry from a class
router.delete("/removetimetablefromclass/:classId/timetable/:timetableId", async (req, res) => {
  const { classId, timetableId } = req.params;
  try {
    const updatedClass = await classService.removeTimetableEntry(classId, timetableId);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
