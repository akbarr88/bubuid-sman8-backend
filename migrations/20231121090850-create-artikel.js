'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artikels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      highlight_isi: {
        type: Sequelize.STRING
      },
      profil_penulis: {
        type: Sequelize.STRING
      },
      judul: {
        type: Sequelize.STRING
      },
      isi: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      penulis: {
        type: Sequelize.STRING
      },
      pekerjaan: {
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
    await queryInterface.dropTable('Artikels');
  }
};