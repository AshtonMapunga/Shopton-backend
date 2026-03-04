const { sendEmail } = require("../services/email.service");

/**
 * PAYMENT SUCCESSFUL
 */
const sendPaymentSuccessful = async (req, res) => {
  try {
    const { name, email, orderId, total, paymentMethod } = req.body;

    if (!name || !email || !orderId || !total || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    await sendEmail({
      to: email,
      subject: "Payment Successful",
      templateName: "paymentSuccessful",
      data: { name, orderId, total, paymentMethod }
    });

    res.status(200).json({
      success: true,
      message: "Payment successful email sent"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send payment email",
      error: error.message
    });
  }
};


/**
 * ORDER DELIVERED
 */
const sendOrderDelivered = async (req, res) => {
  try {
    const { name, email, orderId } = req.body;

    if (!name || !email || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    await sendEmail({
      to: email,
      subject: "Your Order Has Been Delivered",
      templateName: "orderDelivered",
      data: { name, orderId }
    });

    res.status(200).json({
      success: true,
      message: "Order delivered email sent"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send delivery email",
      error: error.message
    });
  }
};


/**
 * WELCOME EMAIL
 */
const sendWelcomeEmail = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    await sendEmail({
      to: email,
      subject: "Welcome to Shoptoo",
      templateName: "welcome",
      data: {
        name,
        shopUrl: process.env.FRONTEND_URL || "https://shoptoo.com"
      }
    });

    res.status(200).json({
      success: true,
      message: "Welcome email sent"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send welcome email",
      error: error.message
    });
  }
};


/**
 * ABANDONED CART REMINDER
 */
const sendAbandonedCartReminder = async (req, res) => {
  try {
    const { name, email, total } = req.body;

    if (!name || !email || !total) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    await sendEmail({
      to: email,
      subject: "You left items in your cart",
      templateName: "abandonedCart",
      data: {
        name,
        total,
        cartUrl: `${process.env.FRONTEND_URL}/cart`
      }
    });

    res.status(200).json({
      success: true,
      message: "Abandoned cart email sent"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send abandoned cart email",
      error: error.message
    });
  }
};


module.exports = {
  sendPaymentSuccessful,
  sendOrderDelivered,
  sendWelcomeEmail,
  sendAbandonedCartReminder
};