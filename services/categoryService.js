const Category = require("../models/category/category_schema");
const redis = require("../config/redisClient");

const CACHE_KEY = "categories_cache";

const safeRedisGet = async (key) => {
  try { return await redis.get(key); } catch { return null; }
};

const safeRedisSet = async (key, value, opts) => {
  try { await redis.set(key, value, opts); } catch { /* non-fatal */ }
};

const safeRedisDel = async (key) => {
  try { await redis.del(key); } catch { /* non-fatal */ }
};

const createCategory = async (data) => {
  const existing = await Category.findOne({ categoryID: data.categoryID });
  if (existing) throw new Error("Category ID already exists");

  const category = new Category(data);
  await category.save();
  await safeRedisDel(CACHE_KEY);
  return category;
};

const getAllCategories = async () => {
  const cached = await safeRedisGet(CACHE_KEY);
  if (cached) return cached;

  const categories = await Category.find({ isActive: true }).sort({ categoryID: 1 });
  await safeRedisSet(CACHE_KEY, categories, { ex: 3600 });
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");
  return category;
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) throw new Error("Category not found");
  await safeRedisDel(CACHE_KEY);
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error("Category not found");
  await safeRedisDel(CACHE_KEY);
  return { message: "Category deleted" };
};

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
