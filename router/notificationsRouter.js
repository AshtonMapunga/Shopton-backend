const express = require("express");
const router = express.Router();
const notifications = require("../services/notificationsServices"); // Adjust the path as per your project structure

// Create a new class
router.post("/create", async (req, res) => {
  try {
    const newNotifications = await notifications.createNotifications(req.body);
    res.status(201).json(newNotifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all banners
router.get("/getall", async (req, res) => {
  try {
    const notifi = await notifications.getAllNotifications();
    res.status(200).json(notifi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a class by ID
router.put("/update/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  try {
    const updatedNotification = await notifications.updateNotifications(notificationId, req.body);
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class by ID
router.delete("/delete/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  try {
    const deletedBanner = await notifications.deleteBanner(notificationId);
    res.status(200).json(deletedBanner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


module.exports = router;
