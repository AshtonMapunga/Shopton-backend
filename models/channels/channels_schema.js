const mongoose = require("mongoose");

const ChannelsSchema = new mongoose.Schema({
    name: { type: String, required: true },
  level: { type: String, required: true }, // e.g., Grade 7
  subject: { type: String, required: true },
  icon: { type: String },
  tutor: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  createdAt: { type: Date, default: Date.now },
   
  
}, { timestamps: true });


module.exports = mongoose.model("Channel", ChannelsSchema);
