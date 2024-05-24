const { message } = require("telegraf/filters");
const { User } = require("../models");
const { Konseling } = require("../models");
const { get } = require("../routes");
const { where } = require("sequelize");

module.exports = {
  getAllUser: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    try {
      const users = await User.findAndCountAll({
        offset,
        limit,
      });

      res.json({
        totalItems: users.count,
        totalPages: Math.ceil(users.count / pageSize),
        currentPage: page,
        pageSize,
        message: "berhasil mendapatkan data user",
        data: users.rows,
      });
    } catch (error) {
      error: error.message;
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const users = await User.findOne({
      where: { id: id },
    });

    res.json({
      message: "berhasil mendapatkan data id",
      data: users,
    });
  },

  getUserLogin: async (req, res) => {
    const id = req.user.id;
    if (!id) {
      return res.status(400).json({
        message: "silahkan login terlebih dahulu",
      });
    }
    console.log(id);
    const user = await User.findOne({
      where: { id: id },
    });
    return res.status(200).json({
      status: "get data user login succesfully",
      data: user,
    });
  },

  getUserKonseling: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        include: "konselings",
      });

      if (!user) {
        return res.status(404).json({
          message: `User dengan ID ${id} tidak ditemukan.`,
          data: null,
        });
      }

      res.json({
        message: `Data konseling untuk User dengan ID ${id} ditemukan.`,
        data: user.konselings,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Terjadi kesalahan server.",
        data: null,
      });
    }
  },
};
