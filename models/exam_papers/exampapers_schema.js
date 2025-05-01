const mongoose = require("mongoose");

const examPapersSchema = new mongoose.Schema({
    examType: { type: String, required: true }, 
    title: { type: String, required: true }, 
    level: { type: String, required: true }, 
    fileUrl: { type: String, required: true }, 
    access: { type: String, required: true }, 
  
  
}, { timestamps: true });


module.exports = mongoose.model("ExamPapers", examPapersSchema);
