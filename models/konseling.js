"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Konseling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Konseling.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });
      Konseling.belongsTo(models.Psikolog, {
        foreignKey: "id_psikolog",
        as: "psikolog",
      });
    }
  }
  Konseling.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asal_sekolah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paket: {
        type: DataTypes.ENUM("online", "offline"),
        allowNull: false,
      },
      keluhan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jadwal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_psikolog: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Konseling",
    }
  );
  return Konseling;
};
