const mongoose = require("mongoose");

// Define the Lesson Schema
const LessonSchema = new mongoose.Schema({
    lessontitle: { type: String, required: true },
    lessonDescription: { type: String, required: true }, // Fixed typo from "lessonDecsription" to "lessonDescription"
    uploadedfiles: [{ type: String, default: [] }], // Default to an empty array if no files are uploaded
    videoResources: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
            thumbnailUrl: { type: String, required: true }
        }
    ],
    docResources: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
            type: { type: String, required: true }
        }
    ]

});

// Define the Topics Schema
const TopicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lessons: { type: [LessonSchema], default: [] } // Default to an empty array if no lessons are provided
});

// Define the Class Schema
const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    classstatus: { type: String, required: true }, 
    ratings: { type: String, required: true }, 
    level: { type: String, required: true },
    meetinglink: { type: String, },
    classpageimageurl: { type: String, required: true },  
    classprice: { type: String, required: true }, 
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, 
    students: { type: [mongoose.Schema.Types.ObjectId], ref: 'Student', default: [] }, // Default to empty array if no students
    timetable: { 
        type: [{
            day: { type: String, required: true },
            subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
            time: { type: String, required: true },
        }], 
        default: [] // Default to an empty array if no timetable is provided
    }, 
    topics: { type: [TopicSchema], default: [] } // Default to an empty array if no topics are provided
}, { timestamps: true });

module.exports = mongoose.model("Class", ClassSchema);
