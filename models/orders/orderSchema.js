const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  orderNumberFormatted: { type: String },

  userId: { type: String },

  deliveryDetails: {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true }
  },

  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      productImage: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],

  totalAmount: { type: Number, required: true },

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },

  deliveryStatus: {
    type: String,
    enum: ['completed', 'off', 'confirmed', 'processing', 'delivered'],
    default: 'off'
  },

  paymentModel: {
    type: String,
    enum: ['bnpl', 'cod', 'online'],
    default: 'online'
  },

  depositAmount: { type: Number, required: true },
  remainAmount: { type: Number, required: true },

  paymentMethod: { type: String, required: true },
  transactionReferenceID: { type: String },

  createdAt: { type: Date, default: Date.now }
});

orderSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.orderNumber = obj.orderNumberFormatted;
  delete obj.orderNumberFormatted;
  return obj;
};

module.exports = mongoose.model('Order', orderSchema);
