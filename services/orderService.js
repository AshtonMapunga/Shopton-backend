const Order = require("../models/orders/orderSchema");

// Create new order
const createOrder = async (orderData) => {
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
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
