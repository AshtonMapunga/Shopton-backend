const Notifications = require("../models/notifications/notifications"); // Adjust the path according to your file structure

// Create a new class
const createNotifications = async (notificationsData) => {
  try {
    const newNotifications = new Notifications(notificationsData);
    await newNotifications.save();
    return newNotifications;
  } catch (error) {
    throw new Error("Error creating notification: " + error.message);
  }
};

// Get all classes
const getAllNotifications = async () => {
  try {
    const notificationss = await Notifications.find()
  
    return notificationss;
  } catch (error) {
    throw new Error("Error fetching Notifications: " + error.message);
  }
};


// Update a class by ID
const updateNotifications = async (notificationsId, updateData) => {
  try {
    const updatedNotifications = await Notifications.findByIdAndUpdate(notificationsId, updateData, { new: true });
    if (!updatedNotifications) {
      throw new Error("Notification not found");
    }
    return updatedNotifications;
  } catch (error) {
    throw new Error("Error updating Notification: " + error.message);
  }
};

// Delete a class by ID
const deleteNotification = async (notificationsId) => {
  try {
    const deletedNotifications = await Notifications.findByIdAndDelete(notificationsId);
    if (!deletedNotifications) {
      throw new Error("Notifications not found");
    }
    return deletedNotifications;
  } catch (error) {
    throw new Error("Error deleting Notifications: " + error.message);
  }
};




module.exports = {
  createNotifications,
  getAllNotifications,
  updateNotifications,
  deleteNotification,
 
};
