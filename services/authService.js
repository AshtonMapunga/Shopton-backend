const jwt = require("jsonwebtoken");
const User = require("../models/user/user_schema");

const JWT_SECRET = process.env.JWT_SECRET || "codicoso2023";
const JWT_EXPIRES = "7d";

const register = async ({ name, email, password, phone }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const user = new User({ name, email, password, phone });
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.isActive) throw new Error("Invalid credentials");

  const match = await user.comparePassword(password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return { user, token };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

const updateProfile = async (userId, data) => {
  const forbidden = ["password", "role", "email"];
  forbidden.forEach((f) => delete data[f]);

  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("User not found");

  const match = await user.comparePassword(currentPassword);
  if (!match) throw new Error("Current password is incorrect");

  user.password = newPassword;
  await user.save();
  return { message: "Password updated successfully" };
};

const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return { message: "User deleted" };
};

module.exports = { register, login, getProfile, updateProfile, changePassword, getAllUsers, deleteUser };
