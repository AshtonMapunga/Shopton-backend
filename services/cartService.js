const Cart = require("../models/cart/cart_schema");
const Product = require("../models/product/products_schema");

const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("items.productId", "name price imageurl stock isActive");
  if (!cart) {
    cart = new Cart({ userId, items: [], totalAmount: 0 });
    await cart.save();
  }
  return cart;
};

const addToCart = async (userId, { productId, quantity = 1 }) => {
  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new Error("Product not found or unavailable");
  if (product.stock < quantity) throw new Error("Insufficient stock");

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [], totalAmount: 0 });

  const existingIdx = cart.items.findIndex((i) => i.productId.toString() === productId);

  if (existingIdx >= 0) {
    const newQty = cart.items[existingIdx].quantity + quantity;
    if (product.stock < newQty) throw new Error("Insufficient stock");
    cart.items[existingIdx].quantity = newQty;
  } else {
    cart.items.push({
      productId,
      name: product.name,
      price: product.price,
      imageurl: product.imageurl,
      quantity,
    });
  }

  cart.recalcTotal();
  await cart.save();
  return cart;
};

const updateCartItem = async (userId, productId, quantity) => {
  if (quantity < 1) throw new Error("Quantity must be at least 1");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Insufficient stock");

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find((i) => i.productId.toString() === productId);
  if (!item) throw new Error("Item not in cart");

  item.quantity = quantity;
  cart.recalcTotal();
  await cart.save();
  return cart;
};

const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  cart.recalcTotal();
  await cart.save();
  return cart;
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return { message: "Cart cleared" };
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
