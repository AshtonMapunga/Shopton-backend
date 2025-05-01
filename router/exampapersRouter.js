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



module.exports = router;
