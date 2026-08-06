const Product = require("../models/product/products_schema");
const redis = require("../config/redisClient");

const CACHE_KEY = "products_cache";

const safeRedisGet = async (key) => {
  try { return await redis.get(key); } catch { return null; }
};

const safeRedisSet = async (key, value, opts) => {
  try { await redis.set(key, value, opts); } catch { /* non-fatal */ }
};

const safeRedisDel = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await Promise.all(keys.map((k) => redis.del(k)));
  } catch { /* non-fatal */ }
};

const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  await safeRedisDel("products_*");
  return product;
};

const getAllProducts = async ({ page = 1, limit = 20 } = {}) => {
  const cacheKey = `${CACHE_KEY}_p${page}_l${limit}`;
  const cached = await safeRedisGet(cacheKey);
  if (cached) return cached;

  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find({ isActive: true }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments({ isActive: true }),
  ]);

  const result = { products, total, page: Number(page), pages: Math.ceil(total / limit) };
  await safeRedisSet(cacheKey, result, { ex: 3600 });
  return result;
};

const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  return product;
};

const getProductsByCategory = async (categoryID, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find({ categoryID, isActive: true }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments({ categoryID, isActive: true }),
  ]);
  return { products, total, page: Number(page), pages: Math.ceil(total / limit) };
};

const getProductsByBrand = async (brand, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const filter = { brand: new RegExp(brand, "i"), isActive: true };
  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);
  return { products, total, page: Number(page), pages: Math.ceil(total / limit) };
};

const searchProducts = async (query, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const filter = {
    isActive: true,
    $or: [
      { name: new RegExp(query, "i") },
      { description: new RegExp(query, "i") },
      { brand: new RegExp(query, "i") },
      { tags: new RegExp(query, "i") },
      { category: new RegExp(query, "i") },
    ],
  };
  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);
  return { products, total, page: Number(page), pages: Math.ceil(total / limit) };
};

const getFeaturedProducts = async () => {
  const cacheKey = "products_featured";
  const cached = await safeRedisGet(cacheKey);
  if (cached) return cached;

  const products = await Product.find({ isFeatured: true, isActive: true }).sort({ createdAt: -1 }).limit(20);
  await safeRedisSet(cacheKey, products, { ex: 3600 });
  return products;
};

const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  if (!product) throw new Error("Product not found");
  await safeRedisDel("products_*");
  return product;
};

const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) throw new Error("Product not found");
  await safeRedisDel("products_*");
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  searchProducts,
  getFeaturedProducts,
  updateProduct,
  deleteProduct,
};
