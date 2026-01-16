// models/CustomRequest.js
const mongoose = require("mongoose");

const CustomRequestSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      ref: "User",
      required: true,
    },

    serviceType: {
      type: String,
      ref: "ServiceType",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

      imageUrls: [
        {
          type: String, 
        },
      ],
      

    budget: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },

    location: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },

    urgency: {
      type: String,
      enum: ["ASAP", "THIS_WEEK", "FLEXIBLE"],
      default: "FLEXIBLE",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "EXPERTS_REQUESTED",
        "QUOTED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomRequest", CustomRequestSchema);
