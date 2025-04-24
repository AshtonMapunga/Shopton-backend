const mongoose = require("mongoose");

const RealSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    level: { type: String, required: true }, 
    exprydate: { type: String, required: true }, 
    videourl: { type: String, required: true }, 
    accessed: { type: String, required: true }, 



   
  
}, { timestamps: true });


module.exports = mongoose.model("Real", RealSchema);
