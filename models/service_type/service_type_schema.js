// models/ServiceType.js
const mongoose = require("mongoose");

const ServiceTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

      
        image: {
            type: String,
                        required: true,

        },

       

        serviceTypeCategory: {
            type: Number,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ServiceType", ServiceTypeSchema);
