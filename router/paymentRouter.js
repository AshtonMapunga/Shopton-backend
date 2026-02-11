const express = require('express');
const router = express.Router();
const { Paynow } = require("paynow");
const paymentService = require('../services/paymentService');

// Initialize Paynow
const initializePaynow = () => {
  const paynow = new Paynow(
    process.env.PAYNOW_INTEGRATION_ID,
    process.env.PAYNOW_INTEGRATION_KEY
  );

  paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
  paynow.returnUrl = process.env.PAYNOW_RETURN_URL;

  return paynow;
};


// ============= WEB PAYMENTS =============

/**
 * @route   POST /api/payments/web
 * @desc    Initiate web payment for an order
 * @access  Public
 */
router.post('/web', async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    
    // Validation
    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Valid amount is required" });
    }

    const result = await paymentService.createWebPayment(orderId, amount);
    
    res.status(200).json({
      success: true,
      message: "Web payment initiated successfully",
      data: {
        payment: result.payment,
        pollUrl: result.pollUrl,
        redirectUrl: result.redirectUrl,
        invoice: result.invoice
      }
    });
  } catch (error) {
    console.error('Web payment error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// ============= MOBILE PAYMENTS =============

/**
 * @route   POST /api/payments/mobile/ecocash
 * @desc    Initiate Ecocash payment
 * @access  Public
 */
router.post('/mobile/ecocash', async (req, res) => {
  try {
    const { orderId, amount, phoneNumber } = req.body;
    
    if (!orderId) return res.status(400).json({ error: "orderId is required" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Valid amount is required" });
    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

    const result = await paymentService.createMobilePayment(orderId, amount, phoneNumber, 'ecocash');
    
    res.status(200).json({
      success: true,
      message: "Ecocash payment initiated",
      data: {
        payment: result.payment,
        pollUrl: result.pollUrl,
        invoice: result.invoice
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/payments/mobile/onemoney
 * @desc    Initiate OneMoney payment
 * @access  Public
 */
router.post('/mobile/onemoney', async (req, res) => {
  try {
    const { orderId, amount, phoneNumber } = req.body;
    
    if (!orderId) return res.status(400).json({ error: "orderId is required" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Valid amount is required" });
    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

    const result = await paymentService.createMobilePayment(orderId, amount, phoneNumber, 'onemoney');
    
    res.status(200).json({
      success: true,
      message: "OneMoney payment initiated",
      data: {
        payment: result.payment,
        pollUrl: result.pollUrl,
        invoice: result.invoice
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/payments/mobile/telecash
 * @desc    Initiate Telecash payment
 * @access  Public
 */
router.post('/mobile/telecash', async (req, res) => {
  try {
    const { orderId, amount, phoneNumber } = req.body;
    
    if (!orderId) return res.status(400).json({ error: "orderId is required" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Valid amount is required" });
    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

    const result = await paymentService.createMobilePayment(orderId, amount, phoneNumber, 'telecash');
    
    res.status(200).json({
      success: true,
      message: "Telecash payment initiated",
      data: {
        payment: result.payment,
        pollUrl: result.pollUrl,
        invoice: result.invoice
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   POST /api/payments/mobile/inbucks
 * @desc    Initiate InBucks payment
 * @access  Public
 */
router.post('/mobile/inbucks', async (req, res) => {
  try {
    const { orderId, amount, phoneNumber } = req.body;
    
    if (!orderId) return res.status(400).json({ error: "orderId is required" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Valid amount is required" });
    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

    const result = await paymentService.createMobilePayment(orderId, amount, phoneNumber, 'inbucks');
    
    res.status(200).json({
      success: true,
      message: "InBucks payment initiated",
      data: {
        payment: result.payment,
        pollUrl: result.pollUrl,
        invoice: result.invoice
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= PAYMENT STATUS =============

/**
 * @route   POST /api/payments/check-status
 * @desc    Check payment status and update
 * @access  Public
 */
router.post('/check-status', async (req, res) => {
  try {
    const { pollUrl } = req.body;
    
    if (!pollUrl) {
      return res.status(400).json({ error: "pollUrl is required" });
    }

    const result = await paymentService.checkPaymentStatus(pollUrl);
    
    res.status(200).json({
      success: true,
      data: {
        payment: result.payment,
        status: result.status,
        paynowStatus: result.paynowStatus
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= GET PAYMENTS =============

/**
 * @route   GET /api/payments
 * @desc    Get all payments with order details
 * @access  Private/Admin
 */
router.get('/', async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/payments/:paymentId
 * @desc    Get single payment by ID with order details
 * @access  Private
 */
router.get('/:paymentId', async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.paymentId);
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/payments/order/:orderId
 * @desc    Get all payments for a specific order
 * @access  Private
 */
router.get('/order/:orderId', async (req, res) => {
  try {
    const payments = await paymentService.getPaymentsByOrderId(req.params.orderId);
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/payments/user/:userId
 * @desc    Get all payments for a specific user
 * @access  Private
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const payments = await paymentService.getPaymentsByUserId(req.params.userId);
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/payments/email/:email
 * @desc    Get payments by customer email
 * @access  Private
 */
router.get('/email/:email', async (req, res) => {
  try {
    const payments = await paymentService.getPaymentsByEmail(req.params.email);
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/payments/phone/:phoneNumber
 * @desc    Get payments by customer phone number
 * @access  Private
 */
router.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const payments = await paymentService.getPaymentsByPhoneNumber(req.params.phoneNumber);
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= UPDATE/DELETE =============

/**
 * @route   PUT /api/payments/:paymentId
 * @desc    Update payment and sync with order
 * @access  Private/Admin
 */
router.put('/:paymentId', async (req, res) => {
  try {
    const payment = await paymentService.updatePayment(req.params.paymentId, req.body);
    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   DELETE /api/payments/:paymentId
 * @desc    Delete payment
 * @access  Private/Admin
 */
router.delete('/:paymentId', async (req, res) => {
  try {
    const result = await paymentService.deletePayment(req.params.paymentId);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;