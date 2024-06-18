const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  createNotification,
  getNotifications,
  updateNotifications,
} = require("../controllers/notification.controller");
const route = express.Router();

route.patch("/update", verifyToken, updateNotifications);
route.post("/:laporId", verifyToken, createNotification);
route.get("/", verifyToken, getNotifications);

module.exports = route;
