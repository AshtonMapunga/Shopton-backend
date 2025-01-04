const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the class (e.g., Grade 10A)
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Assigned teacher
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Students in the class
    timetable: [{
        day: { type: String, required: true },
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        time: { type: String, required: true },
    }], // Class timetable
}, { timestamps: true });


module.exports = mongoose.model("Class", ClassSchema);
