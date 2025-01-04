const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'teacher', enum: ['teacher'], required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, // The class assigned to the teacher
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // Subjects the teacher teaches
    timetable: [{
        day: { type: String, required: true },
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        time: { type: String, required: true },
    }],
}, { timestamps: true });

// Hash password before saving
TeacherSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("Teacher", TeacherSchema);
