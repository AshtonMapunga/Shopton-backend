const Student = require('../models/student/student_schema'); // Adjust the path as per your project structure

// Service to create a new student
const createStudent = async (studentData) => {
    try {
        // Check if email already exists
        const existingStudent = await Student.findOne({ email: studentData.email });
        if (existingStudent) {
            throw new Error('Email already exists');
        }

        // Create and save a new student
        const newStudent = new Student(studentData);
        await newStudent.save();
        return newStudent;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to get all students
const getAllStudents = async () => {
    try {
        return await Student.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a student by email
const getStudentByEmail = async (email) => {
    try {
        return await Student.findOne({ email });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a student by ID
const getStudentById = async (id) => {
    try {
        return await Student.findById(id).populate('classId subjects results.subjectId');
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update a student
const updateStudent = async (id, updateData) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return updatedStudent;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a student
const deleteStudent = async (id) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            throw new Error('Student not found');
        }
        return deletedStudent;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to enroll a student in a subject
const enrollInSubject = async (studentId, subjectId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }

        // Check if subject is already enrolled
        if (student.subjects.includes(subjectId)) {
            throw new Error('Student is already enrolled in this subject');
        }

        student.subjects.push(subjectId);
        await student.save();
        return student;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to update student results
const updateStudentResults = async (studentId, subjectId, marks) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new Error('Student not found');
        }

        // Check if the subject already has a result entry
        const resultIndex = student.results.findIndex(
            (result) => result.subjectId.toString() === subjectId.toString()
        );

        if (resultIndex > -1) {
            student.results[resultIndex].marks = marks; // Update marks
        } else {
            student.results.push({ subjectId, marks }); // Add new result entry
        }

        await student.save();
        return student;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentByEmail,
    getStudentById,
    updateStudent,
    deleteStudent,
    enrollInSubject,
    updateStudentResults,
};
