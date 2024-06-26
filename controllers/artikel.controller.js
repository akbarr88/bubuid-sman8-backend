const { Artikel } = require("../models");

module.exports = {
  getAllArtikel: async (req, res) => {
    const artikels = await Artikel.findAll();

    res.json({
      message: "berhasil mendapatkan data Artikel",
      data: artikels,
    });
  },

  getArtikelById: async (req, res) => {
    const { id } = req.params;
    const artikel = await Artikel.findOne({
      where: { id: id },
    });

    res.json({
      message: "berhasil mendapatkan data id",
      data: artikel,
    });
  },

  addNewArtikel: async (req, res) => {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Anda bukan admin",
      });
    }
    const {
      highlight_isi = "headline",
      judul = "judul",
      isi = "content",
      gambar,
      penulis = "penulis",
      pekerjaan = "pekerjaan",
    } = await req.body;

    const data = {
      highlight_isi,
      judul,
      isi,
      gambar,
      penulis,
      pekerjaan,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Artikel.create(data);
    res.status(201).json({
      message: "Berhasil menambahkan Artikel",
    });
  },

  deleteArtikel: async (req, res) => {
    try {
      const { id } = req.params;
      await Artikel.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        message: "Data Artikel Berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data Artikel",
        error: error.message,
      });
    }
  },

  updateArtikel: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await Artikel.update(data, {
        where: {
          id: id,
        },
      });

      res.status(201).json({
        message: "Berhasil mengupdate data Artikel",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengupdate data Artikel",
        error: error.message,
      });
    }
  },
};
