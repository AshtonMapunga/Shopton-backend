const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    school: { type: String, required: true },
    level: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student', enum: ['student'], required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // The class the student belongs to
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // Subjects the student is enrolled in
    results: [{
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        marks: { type: Number },
    }], // Academic results for the student
    libraryAccess: { type: Boolean, default: true }, // Access to the library
}, { timestamps: true });

// Hash password before saving
studentSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("Student", studentSchema);
