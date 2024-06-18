const { where } = require("sequelize");
const { Konseling } = require("../models");
const { User } = require("../models");
const db = require("../models");
const { Psikolog } = require("../models");
const { Lapor } = require("../models");
const { Status } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllLapor: async (req, res) => {
    const filter = req.query.filter;
    console.log(filter);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const filterCondition =
      filter === "true" ? true : filter === "false" ? false : null;

    try {
      const statusCount = await Status.count({
        where: { verified: true },
      });
      const lapor = await Lapor.findAndCountAll({
        offset,
        limit,
        include: [
          { model: db.User, attributes: ["id", "nama", "email"] },
          {
            model: db.Status,
            attributes: ["id", "verified"],
            where: filterCondition !== null && { verified: filterCondition },
          },
        ],
      });
      res.json({
        totalLaporVerified: statusCount,
        message: "berhasil mendapatkan data Lapor",
        totalItems: lapor.count,
        totalPages: Math.ceil(lapor.count / pageSize),
        currentPage: page,
        pageSize,
        data: lapor.rows,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getLaporById: async (req, res) => {
    const { id } = req.params;
    const laporId = id;
    if (!laporId) {
      return res.status(400).json({
        message: "data not found",
      });
    }
    const lapor = await Lapor.findOne({
      where: { id: laporId },
      include: {
        model: db.User,
        attributes: ["id", "nama", "email", "umur", "jenis_kelamin", "sekolah"],
      },
    });

    res.json({
      message: "berhasil mendapatkan data id",
      data: lapor,
    });
  },

  addNewLapor: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const { id } = decoded;
    const { tanggal, keterangan, img } = req.body;
    const newLapor = await Lapor.create({
      tanggal,
      keterangan,
      img,
      user_id: id,
    });
    await Status.create({
      verified: false,
      lapor_id: newLapor.id,
    });

    res.status(201).json({
      message: "Berhasil menambahkan Lapor",
    });
  },

  deleteLapor: async (req, res) => {
    const role = req.user.role;
    const { id } = req.params;
    if (role !== "admin") {
      return res.status(403).json({
        message: "Anda bukan admin",
      });
    }
    try {
      await Lapor.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        message: "Data Lapor Berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus data Lapor",
        error: error.message,
      });
    }
  },
  updateLapor: async (req, res) => {
    try {
      const { id, status } = req.params;
      console.log(id, status);
      if (!status) {
        const data = req.body;
        await Lapor.update(data, {
          where: {
            id: id,
          },
        });
      }

      if (status) {
        await Status.update(
          { verified: status },
          {
            where: {
              lapor_id: id,
            },
          }
        );
      }

      res.status(201).json({
        message: "Berhasil mengupdate data Lapor",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengupdate data Lapor",
        error: error.message,
      });
    }
  },
};
