"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Notifications", "title");
    await queryInterface.removeColumn("Notifications", "message");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Notifications", "title", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Notifications", "message", {
      type: Sequelize.TEXT,
    });
  },
};
