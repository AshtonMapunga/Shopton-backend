// router/wooCommerceRouter.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Redis } = require('@upstash/redis');

const router = express.Router();

// ---------------------
// Redis Setup
// ---------------------
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

redis.ping()
  .then(() => console.log('Connected to Upstash Redis'))
  .catch(err => console.error('Redis connection error:', err));

// ---------------------
// WooCommerce Axios Instance
// ---------------------
const wcAxios = axios.create({
  baseURL: process.env.WOOCOMMERCE_BASE_URL,
  auth: {
    username: process.env.WOOCOMMERCE_CONSUMER_KEY,
    password: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  },
});

// ---------------------
// Routes
// ---------------------

// Get all products with pagination & optional tag
router.get('/products', async (req, res) => {
  const { page = 1, perPage = 10, tag } = req.query;
  const cacheKey = `products_page_${page}_perPage_${perPage}_tag_${tag || 'all'}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const response = await wcAxios.get('/products', {
      params: { page, per_page: perPage, ...(tag ? { tag } : {}) },
    });

    await redis.set(cacheKey, response.data, { ex: 300 });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `product_${id}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const response = await wcAxios.get(`/products/${id}`);
    await redis.set(cacheKey, response.data, { ex: 300 });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Search products
router.get('/products/search', async (req, res) => {
  const { query, page = 1, perPage = 10 } = req.query;
  const cacheKey = `search_${query}_page_${page}_perPage_${perPage}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const response = await wcAxios.get('/products', {
      params: { search: query, type: 'simple', page, per_page: perPage },
    });

    await redis.set(cacheKey, response.data, { ex: 300 });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Get products by category
router.get('/products/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, perPage = 10 } = req.query;
  const cacheKey = `category_${categoryId}_page_${page}_perPage_${perPage}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const response = await wcAxios.get('/products', {
      params: { category: categoryId, type: 'simple', page, per_page: perPage },
    });

    await redis.set(cacheKey, response.data, { ex: 300 });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const cacheKey = `categories_page_${page}_perPage_${perPage}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    const response = await wcAxios.get('/products/categories', {
      params: { page, per_page: perPage },
    });

    await redis.set(cacheKey, response.data, { ex: 300 });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
