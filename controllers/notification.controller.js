const { where } = require("sequelize");
const db = require("../models");
const { Notification } = require("../models");

module.exports = {
  createNotification: async (req, res) => {
    try {
      const { user } = req;
      const { laporId } = req.params;
      console.log("mylaporid" + laporId);
      const newNotification = await Notification.create({
        userId: user.id,
        laporId: Number(laporId),
        isRead: false,
      });

      return res.status(201).json({
        data: newNotification,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getNotifications: async (req, res) => {
    const { user } = req;

    try {
      const notifications = await Notification.findAndCountAll({
        include: {
          model: db.Lapor,
          as: "lapor",
          where: {
            user_id: user.id,
          },
        },
      });

      const unreadCount = await Notification.count({
        where: {
          isRead: false,
        },
        include: {
          model: db.Lapor,
          as: "lapor",
          where: {
            user_id: user.id,
          },
        },
      });

      return res.status(200).json({ data: { ...notifications, unreadCount } });
    } catch (error) {
      console.error("Error getting notifications:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  updateNotifications: async (req, res) => {
    const { user } = req;

    try {
      const notifications = await Notification.findAll({
        include: {
          model: db.Lapor,
          as: "lapor",
          where: {
            user_id: user.id,
          },
        },
      });

      if (!notifications) {
        return res.status(404).json({ message: "Notifications not found" });
      }

      const notification = notifications
        .filter((i) => (i.lapor.user_id = user.id && !i.isRead))
        .map((i) => i.id);

      const updateNotif = await Notification.update(
        { isRead: true },
        { where: { id: notification } }
      );

      console.log("updatee notif", updateNotif);

      return res.status(200).json({ data: notification });
    } catch (error) {
      console.error("Error getting notifications:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
