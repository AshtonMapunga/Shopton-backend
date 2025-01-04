const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the quiz
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Creator of the quiz
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Class the quiz is assigned to
    questions: [{
        questionText: { type: String, required: true }, // The question text
        options: [{ type: String, required: true }], // Array of possible answers
        correctAnswer: { type: String, required: true }, // The correct answer
    }],
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }, // Subject of the quiz
    dueDate: { type: Date }, // Deadline for completing the quiz
}, { timestamps: true });


module.exports = mongoose.model("Quiz", quizSchema);
