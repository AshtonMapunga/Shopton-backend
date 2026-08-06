const express = require("express");
const router = express.Router();
const productService = require("../services/productService");
const { authenticateToken, isAdmin } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product catalogue management
 */

/**
 * @swagger
 * /api/v1/product_route/create:
 *   post:
 *     summary: Create a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, imageurl, categoryID, category, stock]
 *             properties:
 *               name: { type: string, example: "Samsung Galaxy S24" }
 *               description: { type: string, example: "Latest flagship smartphone" }
 *               price: { type: number, example: 999.99 }
 *               originalPrice: { type: number, example: 1099.99 }
 *               discount: { type: number, example: 10 }
 *               imageurl: { type: string, example: "https://example.com/image.jpg" }
 *               images: { type: array, items: { type: string } }
 *               categoryID: { type: number, example: 1 }
 *               category: { type: string, example: "Phones" }
 *               brand: { type: string, example: "Samsung" }
 *               tags: { type: array, items: { type: string }, example: ["smartphone", "android"] }
 *               stock: { type: number, example: 50 }
 *               sku: { type: string, example: "SAM-S24-BLK" }
 *               isFeatured: { type: boolean, example: false }
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       400:
 *         description: Validation error
 *       403:
 *         description: Admin access required
 */
router.post("/create", authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/getall:
 *   get:
 *     summary: Get all active products (paginated)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 products:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 *                 total: { type: number }
 *                 page: { type: number }
 *                 pages: { type: number }
 */
router.get("/getall", async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/featured:
 *   get:
 *     summary: Get featured products (shown on homepage)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of featured products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 */
router.get("/featured", async (req, res) => {
  try {
    const products = await productService.getFeaturedProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/search:
 *   get:
 *     summary: Search products by name, description, brand, or tags
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         example: samsung
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 products:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 *                 total: { type: number }
 *       400:
 *         description: Query param (q) is required
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Search query (q) is required" });
    const result = await productService.searchProducts(q, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/category/{categoryID}:
 *   get:
 *     summary: Get all products in a category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema: { type: integer }
 *         example: 1
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 products:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 *                 total: { type: number }
 */
router.get("/category/:categoryID", async (req, res) => {
  try {
    const result = await productService.getProductsByCategory(Number(req.params.categoryID), req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/brand/{brand}:
 *   get:
 *     summary: Get all products by brand name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema: { type: string }
 *         example: Samsung
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Products from the specified brand
 */
router.get("/brand/:brand", async (req, res) => {
  try {
    const result = await productService.getProductsByBrand(req.params.brand, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/{productId}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       404:
 *         description: Product not found
 */
router.get("/:productId", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/update/{productId}:
 *   put:
 *     summary: Update a product (admin only)
 *     tags: [Products]
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
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               stock: { type: number }
 *               isActive: { type: boolean }
 *               isFeatured: { type: boolean }
 *               discount: { type: number }
 *     responses:
 *       200:
 *         description: Product updated
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.put("/update/:productId", authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.productId, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/product_route/delete/{productId}:
 *   delete:
 *     summary: Delete a product (admin only)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product deleted
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.delete("/delete/:productId", authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.productId);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

module.exports = router;
