const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the book
    category: { type: String, required: true }, // Title of the book
    coverimageurl: { type: String, required: true }, // Title of the book
    author: { type: String, required: true }, // Author of the book
    subject: { type: String, required: true }, // Subject category of the book
    publicationYear: { type: Number, required: true }, // Year the book was published
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Admin who uploaded the book
    fileUrl: { type: String, required: true }, // URL of the uploaded book file
    description: { type: String }, // Optional description of the book
}, { timestamps: true });


module.exports = mongoose.model("Library", librarySchema);


