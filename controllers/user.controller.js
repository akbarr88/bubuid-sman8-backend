const { User } = require("../models");
const { Konseling } = require("../models");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll();

      res.json({
        message: "berhasil mendapatkan data user",
        data: users,
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
