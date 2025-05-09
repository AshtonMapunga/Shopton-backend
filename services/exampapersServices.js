const ExamPapers = require("../models/exam_papers/exampapers_schema"); 

const getAllExamPapers = async () => {
  try {
    const eampprs = await ExamPapers.find()
  
    return eampprs;
  } catch (error) {
    throw new Error("Error fetching exam: " + error.message);
  }
};


const createExamPaper = async (examData) => {
  try {
    const newExamP = new ExamPapers(examData);
    await newExamP.save();
    return newExamP;
  } catch (error) {
    throw new Error("Error creating exam paper: " + error.message);
  }
};






module.exports = {
    getAllExamPapers, 
    createExamPaper
};
