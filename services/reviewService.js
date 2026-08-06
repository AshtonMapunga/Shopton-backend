const Review = require("../models/review/review_schema");
const Product = require("../models/product/products_schema");

const createReview = async ({ productId, userId, userName, rating, comment }) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const existing = await Review.findOne({ productId, userId });
  if (existing) throw new Error("You have already reviewed this product");

  const review = new Review({ productId, userId, userName, rating, comment });
  await review.save();

  await syncProductRating(productId);
  return review;
};

const getReviewsByProduct = async (productId) => {
  return await Review.find({ productId }).sort({ createdAt: -1 });
};

const updateReview = async (reviewId, userId, { rating, comment }) => {
  const review = await Review.findOne({ _id: reviewId, userId });
  if (!review) throw new Error("Review not found or not yours to edit");

  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;
  await review.save();

  await syncProductRating(review.productId);
  return review;
};

const deleteReview = async (reviewId, userId, role) => {
  const query = role === "admin" ? { _id: reviewId } : { _id: reviewId, userId };
  const review = await Review.findOneAndDelete(query);
  if (!review) throw new Error("Review not found");

  await syncProductRating(review.productId);
  return { message: "Review deleted" };
};

const syncProductRating = async (productId) => {
  const reviews = await Review.find({ productId });
  const numReviews = reviews.length;
  const rating = numReviews > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / numReviews : 0;
  await Product.findByIdAndUpdate(productId, { rating: parseFloat(rating.toFixed(1)), numReviews });
};

module.exports = { createReview, getReviewsByProduct, updateReview, deleteReview };
