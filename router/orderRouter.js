const express = require("express");
const router = express.Router();
const order = require("../services/orderService");

// Create new order (after payment success)
router.post("/create", async (req, res) => {
  try {
    const newOrder = await order.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get("/getall", async (req, res) => {
  try {
    const orders = await order.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get orders by user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await order.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order
router.put("/update/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await order.updateOrder(orderId, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete order
router.delete("/delete/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await order.deleteOrder(orderId);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
