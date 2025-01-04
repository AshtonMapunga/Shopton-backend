const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth'); // Assuming you have an auth middleware for JWT authentication

// Route to create a new student
router.post('/create', async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await studentService.createStudent(studentData);
        res.status(201).json({
            message: 'Student created successfully',
            data: newStudent,
        });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(400).json({ message: 'Error creating student', error: error.message });
    }
});

// Route to fetch all students (secured)
router.get('/getallstudents', authenticateToken, async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json({
            message: 'Students retrieved successfully',
            data: students,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
});

// Route to fetch a student by email (secured)
router.get('/getstudentbyemail/:email', authenticateToken, async (req, res) => {
    try {
        const student = await studentService.getStudentByEmail(req.params.email);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({
            message: 'Student retrieved successfully',
            data: student,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error: error.message });
    }
});

// Route to fetch a student by ID (secured)
router.get('/getstudentbyid/:id', authenticateToken, async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({
            message: 'Student retrieved successfully',
            data: student,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error: error.message });
    }
});

// Route to update student details (secured)
router.put('/updatestudent/:id', authenticateToken, async (req, res) => {
    try {
        const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({
            message: 'Student updated successfully',
            data: updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
});

// Route to delete a student (secured)
router.delete('/deletestudent/:id', authenticateToken, async (req, res) => {
    try {
        const deletedStudent = await studentService.deleteStudent(req.params.id);
        res.status(200).json({
            message: 'Student deleted successfully',
            data: deletedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
});

// Route to enroll a student in a subject (secured)
router.put('/enrollsubject/:studentId/:subjectId', authenticateToken, async (req, res) => {
    try {
        const student = await studentService.enrollInSubject(req.params.studentId, req.params.subjectId);
        res.status(200).json({
            message: 'Student enrolled in subject successfully',
            data: student,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling student in subject', error: error.message });
    }
});

// Route to update student results (secured)
router.put('/updateresults/:studentId/:subjectId', authenticateToken, async (req, res) => {
    try {
        const { marks } = req.body;
        const updatedStudent = await studentService.updateStudentResults(req.params.studentId, req.params.subjectId, marks);
        res.status(200).json({
            message: 'Student results updated successfully',
            data: updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student results', error: error.message });
    }
});

module.exports = router;
