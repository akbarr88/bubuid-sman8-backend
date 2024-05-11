'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Psikologs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_psikolog: {
        type: Sequelize.STRING
      },
      pendidikan: {
        type: Sequelize.STRING
      },
      highlight_biography: {
        type: Sequelize.STRING
      },
      biography: {
        type: Sequelize.STRING
      },
      jadwal: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Psikologs');
  }
};