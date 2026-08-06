const express = require("express");
const router = express.Router();
const reviewService = require("../services/reviewService");
const { authenticateToken } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product reviews and ratings
 */

/**
 * @swagger
 * /api/v1/reviews/create:
 *   post:
 *     summary: Submit a product review (one per user per product)
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, rating]
 *             properties:
 *               productId: { type: string, example: "64f1a2b3c4d5e6f7a8b9c0d1" }
 *               rating: { type: integer, minimum: 1, maximum: 5, example: 4 }
 *               comment: { type: string, example: "Great product, fast delivery!" }
 *               userName: { type: string, example: "John D." }
 *     responses:
 *       201:
 *         description: Review submitted and product rating updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Review' }
 *       400:
 *         description: Already reviewed this product or missing fields
 *       401:
 *         description: No token provided
 */
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating) {
      return res.status(400).json({ message: "productId and rating are required" });
    }
    const review = await reviewService.createReview({
      productId,
      userId: req.user.id,
      userName: req.body.userName || "Anonymous",
      rating,
      comment,
    });
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of reviews for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 count: { type: number }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Review' }
 */
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByProduct(req.params.productId);
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/reviews/update/{reviewId}:
 *   put:
 *     summary: Update your own review
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating: { type: integer, minimum: 1, maximum: 5, example: 5 }
 *               comment: { type: string, example: "Updated: even better than I thought!" }
 *     responses:
 *       200:
 *         description: Review updated and product rating recalculated
 *       400:
 *         description: Review not found or not yours to edit
 *       401:
 *         description: No token provided
 */
router.put("/update/:reviewId", authenticateToken, async (req, res) => {
  try {
    const review = await reviewService.updateReview(req.params.reviewId, req.user.id, req.body);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/reviews/delete/{reviewId}:
 *   delete:
 *     summary: Delete a review (own review or admin can delete any)
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Review deleted
 *       401:
 *         description: No token provided
 *       404:
 *         description: Review not found
 */
router.delete("/delete/:reviewId", authenticateToken, async (req, res) => {
  try {
    const result = await reviewService.deleteReview(req.params.reviewId, req.user.id, req.user.role);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

module.exports = router;
