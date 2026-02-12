const { Paynow } = require("paynow");
const Payment = require('../models/payments/paymentsSchema');
const Order = require('../models/orders/orderSchema');

// Initialize Paynow
const paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
);

/**
 * Create a web payment for an order
 * @param {string} orderId - The ID of the order to pay for
 * @param {number} amount - The amount to pay
 * @returns {Promise} - Payment with populated order
 */
const createWebPayment = async (orderId, amount) => {
  try {
    // 1. Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    // 2. Create Paynow payment using order details
    const invoice = `INV-${order.orderNumberFormatted || Date.now()}`;
    const payment = paynow.createPayment(invoice, order.deliveryDetails.email);
    payment.add(`Order ${order.orderNumberFormatted}`, amount);

    // 3. Send to Paynow
    const response = await paynow.send(payment);

    if (response.success) {
      // 4. Create payment record
      const newPayment = new Payment({
        order: orderId,
        pollUrl: response.pollUrl,
        price: amount,
        currency: "USD",
        isPaid: false,
        showPayment: true
      });

      await newPayment.save();

      // 5. Update order with payment reference
      order.paymentStatus = 'pending';
      order.transactionReferenceID = newPayment._id;
      await order.save();

      // 6. Return payment with populated order
      const populatedPayment = await Payment.findById(newPayment._id)
        .populate('order');

      return {
        success: true,
        payment: populatedPayment,
        pollUrl: response.pollUrl,
        redirectUrl: response.redirectUrl,
        invoice
      };
    } else {
      throw new Error("Failed to initiate payment with Paynow");
    }
  } catch (error) {
    console.error('Create web payment error:', error);
    throw new Error(error.message || "Failed to process web payment");
  }
};


/**
 * Create ZimSwitch payment
 * @param {string} orderId
 * @param {number} amount
 */
const createZimSwitchPayment = async (orderId, amount) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const invoice = `ZIMS-${order.orderNumberFormatted || Date.now()}`;

    const payment = paynow.createPayment(
      invoice,
      order.deliveryDetails.email
    );

    payment.add(`Order ${order.orderNumberFormatted}`, amount);

    paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
    paynow.returnUrl = process.env.PAYNOW_RETURN_URL;

    // Same as card: redirect flow
    const response = await paynow.send(payment);

    if (!response.success) {
      throw new Error("Failed to initiate ZimSwitch payment with Paynow");
    }

    const newPayment = new Payment({
      order: orderId,
      pollUrl: response.pollUrl,
      price: amount,
      currency: "USD",
      isPaid: false,
      showPayment: true,
      paymentMethod: "zimswitch"
    });

    await newPayment.save();

    order.paymentStatus = 'pending';
    order.transactionReferenceID = newPayment._id;
    await order.save();

    const populatedPayment = await Payment.findById(newPayment._id)
      .populate('order');

    return {
      success: true,
      payment: populatedPayment,
      pollUrl: response.pollUrl,
      redirectUrl: response.redirectUrl,
      invoice
    };

  } catch (error) {
    console.error('Create ZimSwitch payment error:', error);
    throw new Error(error.message || "Failed to process ZimSwitch payment");
  }
};




/**
 * Create Visa / MasterCard payment
 * @param {string} orderId
 * @param {number} amount
 */
const createCardPayment = async (orderId, amount) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const invoice = `CARD-${order.orderNumberFormatted || Date.now()}`;

    const payment = paynow.createPayment(
      invoice,
      order.deliveryDetails.email
    );

    payment.add(`Order ${order.orderNumberFormatted}`, amount);

    // Ensure URLs are set
    paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
    paynow.returnUrl = process.env.PAYNOW_RETURN_URL;

    // IMPORTANT: Use normal send() for card payments
    const response = await paynow.send(payment);

    if (!response.success) {
      throw new Error("Failed to initiate card payment with Paynow");
    }

    const newPayment = new Payment({
      order: orderId,
      pollUrl: response.pollUrl,
      price: amount,
      currency: "USD",
      isPaid: false,
      showPayment: true,
      paymentMethod: "card"
    });

    await newPayment.save();

    order.paymentStatus = 'pending';
    order.transactionReferenceID = newPayment._id;
    await order.save();

    const populatedPayment = await Payment.findById(newPayment._id)
      .populate('order');

    return {
      success: true,
      payment: populatedPayment,
      pollUrl: response.pollUrl,
      redirectUrl: response.redirectUrl,
      invoice
    };

  } catch (error) {
    console.error('Create card payment error:', error);
    throw new Error(error.message || "Failed to process card payment");
  }
};







/**
 * Create a mobile payment for an order
 * @param {string} orderId - The ID of the order to pay for
 * @param {number} amount - The amount to pay
 * @param {string} phoneNumber - Customer's phone number
 * @param {string} method - Payment method (ecocash, onemoney, etc.)
 * @returns {Promise} - Payment with populated order
 */
const createMobilePayment = async (orderId, amount, phoneNumber, method) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error(`Order with ID ${orderId} not found`);

    const invoice = `INV-${order.orderNumberFormatted || Date.now()}`;
    const payment = paynow.createPayment(invoice, order.deliveryDetails.email);
    payment.add(`Order ${order.orderNumberFormatted}`, amount);

    // Ensure phone number is correctly formatted
    phoneNumber = phoneNumber.replace(/\+/, '');

    // Initialize Paynow URLs if missing
    paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
    paynow.returnUrl = process.env.PAYNOW_RETURN_URL;

    const response = await paynow.sendMobile(payment, phoneNumber, method);

    if (!response.success) throw new Error(`Paynow error: ${response.error || 'unknown'}`);

    const newPayment = new Payment({
      order: orderId,
      pollUrl: response.pollUrl,
      price: amount,
      currency: "USD",
      isPaid: false,
      showPayment: true,
      mobilePaymentDetails: {
        method,
        phoneNumber,
        status: 'sent'
      }
    });

    await newPayment.save();
    order.paymentStatus = 'pending';
    order.transactionReferenceID = newPayment._id;
    await order.save();

    const populatedPayment = await Payment.findById(newPayment._id).populate('order');

    return {
      success: true,
      payment: populatedPayment,
      pollUrl: response.pollUrl,
      invoice
    };
  } catch (error) {
    console.error('Create mobile payment error:', error);
    throw new Error(error.message || "Failed to process mobile payment");
  }
};


/**
 * Check payment status and update both payment and order
 * @param {string} pollUrl - Paynow poll URL
 * @returns {Promise} - Updated payment with populated order
 */
const checkPaymentStatus = async (pollUrl) => {
  try {
    // 1. Find payment with order
    const payment = await Payment.findOne({ pollUrl }).populate('order');
    if (!payment) {
      throw new Error(`Payment with pollUrl ${pollUrl} not found`);
    }

    // 2. Poll Paynow
    const status = await paynow.pollTransaction(pollUrl);
    
    // 3. Update based on status
    switch (status.status) {
      case 'paid':
        payment.isPaid = true;
        payment.paymentStatus = 'Paid';
        payment.mobilePaymentDetails = {
          ...payment.mobilePaymentDetails,
          status: 'completed'
        };
        await payment.save();

        // Update order
        if (payment.order) {
          payment.order.paymentStatus = 'paid';
          payment.order.deliveryStatus = 'processing';
          await payment.order.save();
        }
        break;

      case 'cancelled':
        payment.paymentStatus = 'Cancelled';
        payment.mobilePaymentDetails = {
          ...payment.mobilePaymentDetails,
          status: 'cancelled'
        };
        await payment.save();

        // Update order
        if (payment.order) {
          payment.order.paymentStatus = 'cancelled';
          await payment.order.save();
        }
        break;

      case 'failed':
        payment.paymentStatus = 'Failed';
        payment.mobilePaymentDetails = {
          ...payment.mobilePaymentDetails,
          status: 'failed'
        };
        await payment.save();
        break;

      case 'sent':
        payment.mobilePaymentDetails = {
          ...payment.mobilePaymentDetails,
          status: 'sent'
        };
        await payment.save();
        break;
    }

    // 4. Return updated payment with fresh order data
    await payment.populate('order');
    return {
      success: true,
      payment,
      status: status.status,
      paynowStatus: status
    };
  } catch (error) {
    console.error('Check payment status error:', error);
    throw new Error(error.message || "Failed to check payment status");
  }
};

/**
 * Get all payments with populated orders
 * @returns {Promise} - Array of payments with orders
 */
const getAllPayments = async () => {
  try {
    return await Payment.find()
      .populate('order')
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error('Get all payments error:', error);
    throw new Error("Failed to fetch payments");
  }
};

/**
 * Get payment by ID with populated order
 * @param {string} paymentId - Payment ID
 * @returns {Promise} - Payment with populated order
 */
const getPaymentById = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId).populate('order');
    if (!payment) {
      throw new Error(`Payment with ID ${paymentId} not found`);
    }
    return payment;
  } catch (error) {
    console.error('Get payment by ID error:', error);
    throw new Error(error.message || "Failed to fetch payment");
  }
};

/**
 * Get payments by order ID
 * @param {string} orderId - Order ID
 * @returns {Promise} - Array of payments for the order
 */
const getPaymentsByOrderId = async (orderId) => {
  try {
    return await Payment.find({ order: orderId })
      .populate('order')
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error('Get payments by order ID error:', error);
    throw new Error(error.message || "Failed to fetch payments");
  }
};

/**
 * Get payments by user ID (via orders)
 * @param {string} userId - User ID
 * @returns {Promise} - Array of payments with orders
 */
const getPaymentsByUserId = async (userId) => {
  try {
    // Find all orders for this user
    const orders = await Order.find({ userId });
    const orderIds = orders.map(order => order._id);
    
    // Find payments for these orders
    return await Payment.find({ order: { $in: orderIds } })
      .populate('order')
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error('Get payments by user ID error:', error);
    throw new Error(error.message || "Failed to fetch payments");
  }
};

/**
 * Get payments by email (via orders)
 * @param {string} email - Customer email
 * @returns {Promise} - Array of payments with orders
 */
const getPaymentsByEmail = async (email) => {
  try {
    // Find all orders with this email
    const orders = await Order.find({ 'deliveryDetails.email': email });
    const orderIds = orders.map(order => order._id);
    
    // Find payments for these orders
    return await Payment.find({ order: { $in: orderIds } })
      .populate('order')
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error('Get payments by email error:', error);
    throw new Error(error.message || "Failed to fetch payments");
  }
};

/**
 * Get payments by phone number (via orders)
 * @param {string} phoneNumber - Customer phone number
 * @returns {Promise} - Array of payments with orders
 */
const getPaymentsByPhoneNumber = async (phoneNumber) => {
  try {
    // Find all orders with this phone number
    const orders = await Order.find({ 'deliveryDetails.phoneNumber': phoneNumber });
    const orderIds = orders.map(order => order._id);
    
    // Find payments for these orders
    return await Payment.find({ order: { $in: orderIds } })
      .populate('order')
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error('Get payments by phone error:', error);
    throw new Error(error.message || "Failed to fetch payments");
  }
};

/**
 * Update payment and sync with order
 * @param {string} paymentId - Payment ID
 * @param {Object} updateData - Data to update
 * @returns {Promise} - Updated payment with populated order
 */
const updatePayment = async (paymentId, updateData) => {
  try {
    const payment = await Payment.findById(paymentId).populate('order');
    if (!payment) {
      throw new Error(`Payment with ID ${paymentId} not found`);
    }

    // Update payment fields
    Object.assign(payment, updateData);
    await payment.save();

    // Sync with order if payment status changed to Paid
    if (updateData.isPaid === true || updateData.paymentStatus === 'Paid') {
      if (payment.order) {
        payment.order.paymentStatus = 'paid';
        await payment.order.save();
      }
    }

    // Return with fresh population
    await payment.populate('order');
    return payment;
  } catch (error) {
    console.error('Update payment error:', error);
    throw new Error(error.message || "Failed to update payment");
  }
};

/**
 * Delete payment
 * @param {string} paymentId - Payment ID
 * @returns {Promise} - Success message
 */
const deletePayment = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      throw new Error(`Payment with ID ${paymentId} not found`);
    }

    await Payment.findByIdAndDelete(paymentId);
    return { message: `Payment deleted successfully` };
  } catch (error) {
    console.error('Delete payment error:', error);
    throw new Error(error.message || "Failed to delete payment");
  }
};

module.exports = {
  createWebPayment,
  createMobilePayment,
  checkPaymentStatus,
  getAllPayments,
  getPaymentById,
  getPaymentsByOrderId,
  getPaymentsByUserId,
  getPaymentsByEmail,
  getPaymentsByPhoneNumber,
  updatePayment,
  deletePayment,
  createCardPayment,
  createZimSwitchPayment
};