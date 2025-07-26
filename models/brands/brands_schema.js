const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    numberofitems: { type: String, required: true }, 
    imageurl: { type: String, required: true },
        brandID: { type: Number, required: true }, 
 

   
  
}, { timestamps: true });


module.exports = mongoose.model("Brand", brandSchema);
