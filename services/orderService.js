const Order = require("../models/orders/orderSchema");
const { sendEmail } = require("../services/email.service");


const generateRandomOrderNumber = () => {
  const randomStr = Math.random().toString(36).substring(2, 9).toUpperCase(); // 7 chars
  return `OR-${randomStr}`;
};

const createOrder = async (orderData) => {
  try {
    // Generate formatted order number
    const formattedOrderNumber = generateRandomOrderNumber();

    // Create new order
    const newOrder = new Order({
      ...orderData,
      orderNumber: Date.now(), // unique number for internal reference
      orderNumberFormatted: formattedOrderNumber
    });

    // Save order in DB
    await newOrder.save();

    // ✅ Send order confirmation email
    const recipientEmail = orderData.deliveryDetails?.email;

    if (recipientEmail) {
      try {
        await sendEmail({
          to: recipientEmail,
          subject: "Order Confirmation - Shoptoo",
          templateName: "orderConfirmation",
          data: {
            name: orderData.deliveryDetails.fullName,
            orderId: formattedOrderNumber,
            total: orderData.totalAmount
          }
        });
      } catch (emailError) {
        console.error("Order created but email failed:", emailError.message);
      }
    } else {
      console.warn("Order created but delivery email not found");
    }

    // Return order object
    return newOrder.toJSON();

  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
};
// Get all orders
const getAllOrders = async () => {
  try {
    return await Order.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};

// Get orders by user
const getOrdersByUser = async (userId) => {
  try {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error fetching user orders: " + error.message);
  }
};

// Update order by ID (e.g. to mark as failed)
const updateOrder = async (orderId, updateData) => {
  try {
    const updated = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    if (!updated) throw new Error("Order not found");
    return updated;
  } catch (error) {
    throw new Error("Error updating order: " + error.message);
  }
};

// Delete order
const deleteOrder = async (orderId) => {
  try {
    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) throw new Error("Order not found");
    return deleted;
  } catch (error) {
    throw new Error("Error deleting order: " + error.message);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrder,
  deleteOrder
};
