const express = require('express');
const router = express.Router();
const teacherService = require('../services/teacherService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth'); // Assuming authenticateToken is already defined
const jwt = require('jsonwebtoken');

// Route to create a new teacher (secured)
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const teacherData = req.body;

        const newTeacher = await teacherService.createTeacher(teacherData);

        res.status(201).json({
            message: 'Teacher created successfully',
            data: newTeacher,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating teacher', error: error.message });
    }
});

// Route to get all teachers (secured)
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json({
            message: 'Teachers retrieved successfully',
            data: teachers,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teachers', error: error.message });
    }
});

// Route to fetch a teacher by email (secured)
router.get('/getbyemail/:email', authenticateToken, async (req, res) => {
    try {
        const teacher = await teacherService.getTeacherByEmail(req.params.email);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher retrieved successfully', data: teacher });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teacher', error: error.message });
    }
});

// Route to fetch a teacher by ID (secured)
router.get('/getbyid/:id', authenticateToken, async (req, res) => {
    try {
        const teacher = await teacherService.getTeacherById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher retrieved successfully', data: teacher });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teacher', error: error.message });
    }
});

// Route to update teacher details (secured)
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const updatedTeacher = await teacherService.updateTeacher(req.params.id, req.body);
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ message: 'Teacher updated successfully', data: updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error updating teacher', error: error.message });
    }
});

// Route to delete a teacher (secured)
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        await teacherService.deleteTeacher(req.params.id);
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error: error.message });
    }
});

// Route to assign class to a teacher (secured)
router.put('/assignclass/:teacherId', authenticateToken, async (req, res) => {
    try {
        const { classId } = req.body;
        const updatedTeacher = await teacherService.assignClass(req.params.teacherId, classId);
        res.status(200).json({ message: 'Class assigned successfully', data: updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning class', error: error.message });
    }
});

// Route to assign subjects to a teacher (secured)
router.put('/assignsubjects/:teacherId', authenticateToken, async (req, res) => {
    try {
        const { subjectIds } = req.body;
        const updatedTeacher = await teacherService.assignSubjects(req.params.teacherId, subjectIds);
        res.status(200).json({ message: 'Subjects assigned successfully', data: updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning subjects', error: error.message });
    }
});

// Route to set timetable for a teacher (secured)
router.put('/settimetable/:teacherId', authenticateToken, async (req, res) => {
    try {
        const { timetable } = req.body;
        const updatedTeacher = await teacherService.setTimetable(req.params.teacherId, timetable);
        res.status(200).json({ message: 'Timetable set successfully', data: updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error setting timetable', error: error.message });
    }
});

module.exports = router;
