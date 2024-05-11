"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Konseling, {
        foreignKey: "id_user",
        as: "lapor",
      });
    }
  }

  User.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Kolom email harus unik
        validate: {
          isEmail: true, // Validasi email menggunakan Sequelize
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      umur: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM("pria", "wanita"),
        allowNull: false,
      },
      sekolah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Validasi tambahan menggunakan hooks Sequelize
  User.addHook("beforeValidate", async (user, options) => {
    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new Error("Email sudah digunakan");
    }
  });

  return User;
};
