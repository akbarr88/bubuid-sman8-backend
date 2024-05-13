"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lapor extends Model {
    static associate(models) {
      Lapor.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  Lapor.init(
    {
      tanggal: DataTypes.DATE,
      keterangan: DataTypes.STRING,
      img: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Lapor",
    }
  );

  return Lapor;
};
