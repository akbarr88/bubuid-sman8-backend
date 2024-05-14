"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.belongsTo(models.Lapor, { foreignKey: "lapor_id" });
    }
  }

  Status.init(
    {
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      lapor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Lapors",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Status",
    }
  );

  return Status;
};
