const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
  type: { type: String, enum: ['note', 'video'], required: true },
  url: { type: String },
  content: { type: String },
  channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
  tutor: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  createdAt: { type: Date, default: Date.now },
   
  
}, { timestamps: true });


module.exports = mongoose.model("Content", contentSchema);
