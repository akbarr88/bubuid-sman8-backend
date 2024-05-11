const { Psikolog } = require("../models");
const { Konseling } = require("../models");

module.exports = {
  getAllPsikolog: async (req, res) => {
    const psikolog = await Psikolog.findAll();
    res.json({
      message: "berhasil mendapatkan data Psikolog",
      data: psikolog,
    });
  },
  getPsikologById: async (req, res) => {
    const { id } = req.params;
    const psikolog = await Psikolog.findOne({
      where: { id: id },
    });

    res.json({
      message: "berhasil mendapatkan data id",
      data: psikolog,
    });
  },
  addNewPsikolog: async (req, res) => {
    const data = req.body;
    await Psikolog.create(data);
    res.status(201).json({
      message: "Berhasil menambahkan Psikolog",
    });
  },
  deletePsikolog: async (req, res) => {
    try {
      const { id } = req.params;
      await Psikolog.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        message: "Data Psikolog Berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data Psikolog",
        error: error.message,
      });
    }
  },
  updatePsikolog: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await Psikolog.update(data, {
        where: {
          id: id,
        },
      });

      res.status(201).json({
        message: "Berhasil mengupdate data Psikolog",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengupdate data Psikolog",
        error: error.message,
      });
    }
  },
  getPsikologKonseling: async (req, res) => {
    const { id } = req.params;

    const konselings = await Konseling.findAll({ where: { id_psikolog: id } });

    res.json({
      message: "data Konseling dengan psikolog " + id + " " + "ditemukan",
      data: konselings,
    });
  },
};
