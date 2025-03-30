const Teacher = require('../models/teacher/teacher_schema'); // Adjust the path as per your project structure

// Service to create a new teacher
const createTeacher = async (teacherData) => {
    try {
        // Check if email already exists
        const existingTeacher = await Teacher.findOne({ email: teacherData.email });
        if (existingTeacher) {
            throw new Error('Email already exists');
        }

        // Create and save a new teacher
        const newTeacher = new Teacher(teacherData);
        await newTeacher.save();
        return newTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};



// Service to get all teachers
const getAllTeachers = async () => {
    try {
        return await Teacher.find().populate('classId subjects timetable.subjectId');
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a teacher by email
const getTeacherByEmail = async (email) => {
    try {
        return await Teacher.findOne({ email }).populate('classId subjects timetable.subjectId');
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to fetch a teacher by ID
const getTeacherById = async (id) => {
    try {
        return await Teacher.findById(id).populate('classId subjects timetable.subjectId');
    } catch (error) {
        throw new Error(error.message);
    }
};



// Service to update a teacher
const updateTeacher = async (id, updateData) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTeacher) {
            throw new Error('Teacher not found');
        }
        return updatedTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to delete a teacher
const deleteTeacher = async (id) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        if (!deletedTeacher) {
            throw new Error('Teacher not found');
        }
        return deletedTeacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to assign a class to a teacher
const assignClass = async (teacherId, classId) => {
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        teacher.classId = classId;
        await teacher.save();
        return teacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to assign subjects to a teacher
const assignSubjects = async (teacherId, subjectIds) => {
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        teacher.subjects = subjectIds;
        await teacher.save();
        return teacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Service to set a timetable for a teacher
const setTimetable = async (teacherId, timetable) => {
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        teacher.timetable = timetable;
        await teacher.save();
        return teacher;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherByEmail,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    assignClass,
    assignSubjects,
    setTimetable,
};
