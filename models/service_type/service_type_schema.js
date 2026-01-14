// models/ServiceType.js
const mongoose = require("mongoose");

const ServiceTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

      
        imageurl: {
            type: String,
                        required: true,

        },

         description: {
            type: String,
                        required: true,

        },



         priceStartingFrom: {
            type: Number,
                        required: true,

        },

         averageRating: {
            type: Number,
                        required: true,

        },


          completedJobs: {
            type: Number,
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
