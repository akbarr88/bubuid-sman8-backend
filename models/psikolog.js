"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Psikolog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Psikolog.hasMany(models.Konseling, {
        foreignKey: "id_psikolog",
        as: "konselings",
      });
    }
  }
  Psikolog.init(
    {
      nama_psikolog: DataTypes.STRING,
      pendidikan: DataTypes.STRING,
      highlight_biography: DataTypes.STRING,
      biography: DataTypes.STRING,
      jadwal: DataTypes.STRING,
      gambar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Psikolog",
    }
  );
  return Psikolog;
};
