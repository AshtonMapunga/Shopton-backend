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



// Update a class by ID
const updateEP = async (epId, updateData) => {
  try {
    const updatedBanner = await ExamPapers.findByIdAndUpdate(epId, updateData, { new: true });
    if (!updatedBanner) {
      throw new Error("Exam Paper not found");
    }
    return updatedBanner;
  } catch (error) {
    throw new Error("Error updating exam paper: " + error.message);
  }
};

// Delete a class by ID
const deleteEP = async (epId) => {
  try {
    const deletedBanner = await ExamPapers.findByIdAndDelete(epId);
    if (!deletedBanner) {
      throw new Error("exam paper not found");
    }
    return deletedBanner;
  } catch (error) {
    throw new Error("Error deleting exam paper: " + error.message);
  }
};






module.exports = {
    getAllExamPapers, 
    createExamPaper,
    deleteEP,
    updateEP
};
