"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("Notifications");

    if (tableInfo.statusId) {
      await queryInterface.removeColumn("Notifications", "statusId");
    }

    if (!tableInfo.userId) {
      await queryInterface.addColumn("Notifications", "userId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    if (!tableInfo.laporId) {
      await queryInterface.addColumn("Notifications", "laporId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Lapors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("Notifications");

    if (!tableInfo.statusId) {
      await queryInterface.addColumn("Notifications", "statusId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Statuses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    if (tableInfo.userId) {
      await queryInterface.removeColumn("Notifications", "userId");
    }

    if (tableInfo.laporId) {
      await queryInterface.removeColumn("Notifications", "laporId");
    }
  },
};
