const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
  
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { type: String, default: 'admin', enum: ['admin'], required: true },

});

// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("Admin", adminSchema);
