const mongoose = require('mongoose');

const PaymentRefSchema = new mongoose.Schema(
  {
    classID: {
      type: String,
      required: true
    },
    studentName: {
      type: String,
      default: false
    },
    studentID: {
      type: String,
      required: true
    },
    paymentRef: {
      type: String,
      required: true
    },
   
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PayRef', PaymentRefSchema);