const Quiz = require("../models/quiz/quiz_schema"); // Adjust the path according to your file structure

// Create a new quiz
const createQuiz = async (quizData) => {
  try {
    const quiz = new Quiz(quizData);
    await quiz.save();
    return quiz;
  } catch (error) {
    throw new Error("Error creating quiz: " + error.message);
  }
};

// Get all quizzes
const getAllQuizzes = async () => {
  try {
    const quizzes = await Quiz.find()
      .populate("teacherId", "name email") // Populate teacher details if needed
      .populate("classId", "className") // Populate class details if needed
      .populate("subjectId", "subjectName"); // Populate subject details if needed
    return quizzes;
  } catch (error) {
    throw new Error("Error fetching quizzes: " + error.message);
  }
};

// Get a quiz by ID
const getQuizById = async (quizId) => {
  try {
    const quiz = await Quiz.findById(quizId)
      .populate("teacherId", "name email")
      .populate("classId", "className")
      .populate("subjectId", "subjectName");

    if (!quiz) {
      throw new Error("Quiz not found");
    }

    return quiz;
  } catch (error) {
    throw new Error("Error fetching quiz by ID: " + error.message);
  }
};

// Update a quiz by ID
const updateQuiz = async (quizId, updateData) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(quizId, updateData, { new: true });
    if (!quiz) {
      throw new Error("Quiz not found");
    }
    return quiz;
  } catch (error) {
    throw new Error("Error updating quiz: " + error.message);
  }
};

// Delete a quiz by ID
const deleteQuiz = async (quizId) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }
    return quiz;
  } catch (error) {
    throw new Error("Error deleting quiz: " + error.message);
  }
};

// Get quizzes for a specific teacher
const getQuizzesByTeacher = async (teacherId) => {
  try {
    const quizzes = await Quiz.find({ teacherId })
      .populate("classId", "className")
      .populate("subjectId", "subjectName");
    return quizzes;
  } catch (error) {
    throw new Error("Error fetching quizzes for teacher: " + error.message);
  }
};

// Get quizzes for a specific class
const getQuizzesByClass = async (classId) => {
  try {
    const quizzes = await Quiz.find({ classId })
      .populate("teacherId", "name email")
      .populate("subjectId", "subjectName");
    return quizzes;
  } catch (error) {
    throw new Error("Error fetching quizzes for class: " + error.message);
  }
};

// Get quizzes by due date
const getQuizzesByDueDate = async (dueDate) => {
  try {
    const quizzes = await Quiz.find({ dueDate: { $lte: new Date(dueDate) } })
      .populate("teacherId", "name email")
      .populate("classId", "className")
      .populate("subjectId", "subjectName");
    return quizzes;
  } catch (error) {
    throw new Error("Error fetching quizzes by due date: " + error.message);
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getQuizzesByTeacher,
  getQuizzesByClass,
  getQuizzesByDueDate,
};
