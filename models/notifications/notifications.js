const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    replies: [
        {
          name: { type: [String], required: true },
          message: { type: String, required: true }
        }
      ],

}, { timestamps: true });


module.exports = mongoose.model("Notifications", NotificationsSchema);
