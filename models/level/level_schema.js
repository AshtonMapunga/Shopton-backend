const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
    levelname: { type: String, required: true }, 
    description: { type: String, required: true }, 
  
  
}, { timestamps: true });


module.exports = mongoose.model("Level", levelSchema);
