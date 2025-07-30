const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: {type: Number, required: true  },
      name: {type: String, required: true  },
      quantity: {type: Number, required: true  },
      price: {type: Number, required: true  },
    }
  ],
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, enum: [ 'completed', 'cancelled'] },
  paymentMethod: { type: String, required: true },
  transactionReferenceID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
