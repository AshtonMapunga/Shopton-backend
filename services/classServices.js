const Class = require("../models/class/class_schema"); // Adjust the path according to your file structure

// Create a new class
const createClass = async (classData) => {
  try {
    const newClass = new Class(classData);
    await newClass.save();
    return newClass;
  } catch (error) {
    throw new Error("Error creating class: " + error.message);
  }
};

// Get all classes
const getAllClasses = async () => {
  try {
    const classes = await Class.find()
      .populate("teacherId", "name email") // Populate teacher details if needed
      .populate("students", "name email") // Populate student details if needed
      .populate("timetable.subjectId", "subjectName"); // Populate timetable subject details if needed
    return classes;
  } catch (error) {
    throw new Error("Error fetching classes: " + error.message);
  }
};

// Get class by ID
const getClassById = async (classId) => {
  try {
    const classDetails = await Class.findById(classId)
      .populate("teacherId", "name email")
      .populate("students", "name email")
      .populate("timetable.subjectId", "subjectName");

    if (!classDetails) {
      throw new Error("Class not found");
    }

    return classDetails;
  } catch (error) {
    throw new Error("Error fetching class by ID: " + error.message);
  }
};

// Update a class by ID
const updateClass = async (classId, updateData) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  } catch (error) {
    throw new Error("Error updating class: " + error.message);
  }
};

// Delete a class by ID
const deleteClass = async (classId) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      throw new Error("Class not found");
    }
    return deletedClass;
  } catch (error) {
    throw new Error("Error deleting class: " + error.message);
  }
};

// Add a student to a class
const addStudentToClass = async (classId, studentId) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { students: studentId } },
      { new: true }
    );
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  } catch (error) {
    throw new Error("Error adding student to class: " + error.message);
  }
};

// Remove a student from a class
const removeStudentFromClass = async (classId, studentId) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $pull: { students: studentId } },
      { new: true }
    );
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  } catch (error) {
    throw new Error("Error removing student from class: " + error.message);
  }
};

// Add a timetable entry to a class
const addTimetableEntry = async (classId, timetableEntry) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { timetable: timetableEntry } },
      { new: true }
    );
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  } catch (error) {
    throw new Error("Error adding timetable entry: " + error.message);
  }
};

// Remove a timetable entry from a class
const removeTimetableEntry = async (classId, timetableId) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $pull: { timetable: { _id: timetableId } } },
      { new: true }
    );
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    return updatedClass;
  } catch (error) {
    throw new Error("Error removing timetable entry: " + error.message);
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
  addTimetableEntry,
  removeTimetableEntry,
};
