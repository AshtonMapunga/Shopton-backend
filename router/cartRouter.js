const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");
const { authenticateToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management (requires login)
 */

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details with items and total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Cart' }
 *       401:
 *         description: No token provided
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId: { type: string, example: "64f1a2b3c4d5e6f7a8b9c0d1" }
 *               quantity: { type: integer, default: 1, example: 2 }
 *     responses:
 *       200:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Cart' }
 *       400:
 *         description: Product not found or insufficient stock
 *       401:
 *         description: No token provided
 */
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: "productId is required" });
    const cart = await cartService.addToCart(req.user.id, { productId, quantity });
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/cart/update/{productId}:
 *   put:
 *     summary: Update quantity of an item in the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity: { type: integer, example: 3 }
 *     responses:
 *       200:
 *         description: Cart updated
 *       400:
 *         description: Item not in cart or insufficient stock
 *       401:
 *         description: No token provided
 */
router.put("/update/:productId", authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity) return res.status(400).json({ message: "quantity is required" });
    const cart = await cartService.updateCartItem(req.user.id, req.params.productId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/cart/remove/{productId}:
 *   delete:
 *     summary: Remove a specific item from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       401:
 *         description: No token provided
 */
router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(req.user.id, req.params.productId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/cart/clear:
 *   delete:
 *     summary: Clear all items from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 *       401:
 *         description: No token provided
 */
router.delete("/clear", authenticateToken, async (req, res) => {
  try {
    const result = await cartService.clearCart(req.user.id);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
