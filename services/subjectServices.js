const Subject = require("../models/subjects/subjects_schema"); // Adjust the path according to your file structure

const createSubjects = async (subjectsData) => {
  try {
    const subject = new Subject(subjectsData);
    await subject.save();
    return subject;
  } catch (error) {
    throw new Error("Error creating subject: " + error.message);
  }
};

const getAllSubjects = async () => {
  try {
    const subjects = await Subject.find()
     
    return subjects;
  } catch (error) {
    throw new Error("Error fetching subjects: " + error.message);
  }
};


// Delete a quiz by ID
const deleteSubject = async (subjectId) => {
  try {
    const subject = await Subject.findByIdAndDelete(subjectId);
    if (!subject) {
      throw new Error("subject not found");
    }
    return subject;
  } catch (error) {
    throw new Error("Error deleting subject: " + error.message);
  }
};




module.exports = {
  createSubjects,
  getAllSubjects,
  deleteSubject,

};
