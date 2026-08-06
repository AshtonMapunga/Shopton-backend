const express = require("express");
const router = express.Router();
const order = require("../services/orderService");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and tracking
 */

/**
 * @swagger
 * /api/v1/order_route/create:
 *   post:
 *     summary: Create a new order (triggers confirmation email)
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [deliveryDetails, items, totalAmount, depositAmount, remainAmount, paymentMethod]
 *             properties:
 *               userId: { type: string, example: "user123" }
 *               deliveryDetails:
 *                 type: object
 *                 required: [fullName, phoneNumber, email, address, city]
 *                 properties:
 *                   fullName: { type: string, example: "John Doe" }
 *                   phoneNumber: { type: string, example: "0771234567" }
 *                   email: { type: string, example: "john@example.com" }
 *                   address: { type: string, example: "123 Main St" }
 *                   city: { type: string, example: "Harare" }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId: { type: string }
 *                     name: { type: string }
 *                     productImage: { type: string }
 *                     quantity: { type: number }
 *                     price: { type: number }
 *               totalAmount: { type: number, example: 299.99 }
 *               paymentModel: { type: string, enum: [bnpl, cod, online], example: "online" }
 *               depositAmount: { type: number, example: 299.99 }
 *               remainAmount: { type: number, example: 0 }
 *               paymentMethod: { type: string, example: "ecocash" }
 *     responses:
 *       201:
 *         description: Order created and confirmation email sent
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Order' }
 *       400:
 *         description: Validation error
 */
router.post("/create", async (req, res) => {
  try {
    const newOrder = await order.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/order_route/getall:
 *   get:
 *     summary: Get all orders (admin use)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders sorted by newest first
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Order' }
 */
router.get("/getall", async (req, res) => {
  try {
    const orders = await order.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/order_route/user/{userId}:
 *   get:
 *     summary: Get all orders for a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User's orders sorted by newest first
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Order' }
 */
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await order.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/order_route/update/{orderId}:
 *   put:
 *     summary: Update an order (e.g. change delivery or payment status)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentStatus: { type: string, enum: [pending, paid, cancelled] }
 *               deliveryStatus: { type: string, enum: [completed, off, confirmed, processing, delivered] }
 *     responses:
 *       200:
 *         description: Order updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Order' }
 *       404:
 *         description: Order not found
 */
router.put("/update/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await order.updateOrder(orderId, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/order_route/delete/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
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
