const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderNumber: { type: Number }, // Make not required
  orderNumberFormatted: { type: String }, // Make not required

  items: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
          productImage: { type: String, required: true },

      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, enum: ['completed', 'pending', 'cancelled'], required: true },
  paymentMethod: { type: String, required: true },
  transactionReferenceID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


orderSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.orderNumber = obj.orderNumberFormatted;
  delete obj.orderNumberFormatted;
  return obj;
};

module.exports = mongoose.model('Order', orderSchema);
