const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth'); // Assuming you have an auth middleware for JWT authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Route to create a new student



router.post('/signup', async (req, res) => {
    try {
        const studentData = req.body;

        // Hash the password before saving

        const newStudent = await studentService.createStudent(studentData);

        // Generate a token for the new admin
        const token = jwt.sign(
            { id: newStudent._id, email: newStudent.email },
            'codicoso2023', // Replace with a secure key
            { expiresIn: '12h' } // Token validity: 1 hour
        );

        res.status(201).json({
            message: 'Student  registered successfully',
            data: newStudent,
            token,
        });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(400).json({ message: 'Error registering student', error: error.message });
    }
});







router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const student = await studentService.getStudentByEmail(email);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, student.password);
console.log('Entered Password:', password);
console.log('Stored Hashed Password:', student.email);
console.log('Password Validity:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id, email: student.email },
            'codicoso2023', // Replace 'your_jwt_secret' with a secure key
            { expiresIn: '12h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
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

router.get('/getstudentbyPhoneNumber/:phoneNumber', authenticateToken, async (req, res) => {
    try {
        const student = await studentService.getStudentByphoneNumber(req.params.phoneNumber);
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
