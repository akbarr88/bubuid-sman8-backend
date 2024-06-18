"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Relasi dengan model User
      Notification.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      // Relasi dengan model Lapor
      Notification.belongsTo(models.Lapor, {
        foreignKey: "laporId",
        as: "lapor",
      });
    }
  }

  Notification.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nama tabel user
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      laporId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Lapors", // Nama tabel lapor
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );

  return Notification;
};
