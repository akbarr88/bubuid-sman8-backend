const { Konseling } = require("../models");
const { User } = require("../models");
const { Psikolog } = require("../models");

module.exports = {
  getAllKonseling: async (req, res) => {
    const konseling = await Konseling.findAll();
    res.json({
      message: "berhasil mendapatkan data Konseling",
      data: konseling,
    });
  },
  getKonselingById: async (req, res) => {
    const { id } = req.params;
    const konseling = await Konseling.findOne({
      where: { id: id },
    });

    res.json({
      message: "berhasil mendapatkan data id",
      data: konseling,
    });
  },
  addNewKonseling: async (req, res) => {
    const data = req.body;
    await Konseling.create(data);
    res.status(201).json({
      message: "Berhasil menambahkan Konseling",
    });
  },
  deleteKonseling: async (req, res) => {
    try {
      const { id } = req.params;
      await Konseling.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        message: "Data Konseling Berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data Konseling",
        error: error.message,
      });
    }
  },
  updateKonseling: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await Konseling.update(data, {
        where: {
          id: id,
        },
      });

      res.status(201).json({
        message: "Berhasil mengupdate data Konseling",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengupdate data Konseling",
        error: error.message,
      });
    }
  },
};
