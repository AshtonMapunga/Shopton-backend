const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    imageurl: { type: String, required: true }, 
    categoryName: { type: String, required: true }, 
    productCategoryID: { type: String, required: true }, 
  
}, { timestamps: true });


module.exports = mongoose.model("Banner", bannerSchema);
