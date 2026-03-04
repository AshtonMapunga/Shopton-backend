const express = require("express");
const router = express.Router();

const {
  sendPaymentSuccessful,
  sendOrderDelivered,
  sendWelcomeEmail,
  sendAbandonedCartReminder
} = require("../controllers/email.controller");

// Payment Successful
router.post("/payment-successful", sendPaymentSuccessful);

// Order Delivered
router.post("/order-delivered", sendOrderDelivered);

// Welcome Email
router.post("/welcome", sendWelcomeEmail);

// Abandoned Cart
router.post("/abandoned-cart", sendAbandonedCartReminder);

module.exports = router;