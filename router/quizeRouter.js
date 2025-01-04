const express = require("express");
const router = express.Router();
const quizService = require("../services/quiz_Service"); // Adjust the path as per your project structure

// Create a new quiz
router.post("/create", async (req, res) => {
  try {
    const newQuiz = await quizService.createQuiz(req.body);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all quizzes
router.get("/getall", async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a quiz by ID
router.get("/getquizebyId/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await quizService.getQuizById(quizId);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a quiz by ID
router.put("/updatequize/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const updatedQuiz = await quizService.updateQuiz(quizId, req.body);
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a quiz by ID
router.delete("/deletequize/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const deletedQuiz = await quizService.deleteQuiz(quizId);
    res.status(200).json(deletedQuiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get quizzes for a specific teacher
router.get("/getquizebyteacher/teacher/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  try {
    const quizzes = await quizService.getQuizzesByTeacher(teacherId);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get quizzes for a specific class
router.get("/getquizeforclass/class/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const quizzes = await quizService.getQuizzesByClass(classId);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get quizzes by due date
router.get("/getquizebyduedate/due-date/:dueDate", async (req, res) => {
  const { dueDate } = req.params;
  try {
    const quizzes = await quizService.getQuizzesByDueDate(dueDate);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
