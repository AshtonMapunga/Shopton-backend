const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    pollUrl: {
      type: String,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    showPayment: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      required: true,
      default: "USD"
    },
    price: {
      type: Number,
      required: true
    },
    
    // CORRECTED: Reference to Order model
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    
   
    
    // Track payment attempts
    attempts: { type: Number, default: 1 },
    
    // For mobile payments
    mobilePaymentDetails: {
      method: String,
      phoneNumber: String,
      status: String
    }
  },
  {
    timestamps: true
  }
);

// Method to populate order details
PaymentSchema.methods.populateOrder = async function() {
  await this.populate('order');
  return this;
};

// Static method to find payments with populated orders
PaymentSchema.statics.findWithOrder = function(query = {}) {
  return this.find(query).populate('order');
};

// Static method to find one payment with populated order
PaymentSchema.statics.findOneWithOrder = function(query = {}) {
  return this.findOne(query).populate('order');
};

module.exports = mongoose.model('Payment', PaymentSchema);