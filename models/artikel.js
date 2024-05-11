'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artikel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Artikel.init({
    highlight_isi: DataTypes.STRING,
    profil_penulis: DataTypes.STRING,
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    penulis: DataTypes.STRING,
    pekerjaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artikel',
  });
  return Artikel;
};