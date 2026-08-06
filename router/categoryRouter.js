const express = require("express");
const router = express.Router();
const categoryService = require("../services/categoryService");
const { authenticateToken, isAdmin } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Product category management
 */

/**
 * @swagger
 * /api/v1/category/create:
 *   post:
 *     summary: Create a new category (admin only)
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, categoryID]
 *             properties:
 *               name: { type: string, example: "Phones & Tablets" }
 *               description: { type: string, example: "Smartphones and tablets" }
 *               imageurl: { type: string, example: "https://example.com/phones.jpg" }
 *               categoryID: { type: number, example: 1 }
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Category' }
 *       400:
 *         description: Category ID already exists
 *       403:
 *         description: Admin access required
 */
router.post("/create", authenticateToken, isAdmin, async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/category/getall:
 *   get:
 *     summary: Get all active categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Category' }
 */
router.get("/getall", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Category' }
 *       404:
 *         description: Category not found
 */
router.get("/:id", async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/category/update/{id}:
 *   put:
 *     summary: Update a category (admin only)
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               description: { type: string }
 *               imageurl: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: Category updated
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Category not found
 */
router.put("/update/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /api/v1/category/delete/{id}:
 *   delete:
 *     summary: Delete a category (admin only)
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Category deleted
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Category not found
 */
router.delete("/delete/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

module.exports = router;
