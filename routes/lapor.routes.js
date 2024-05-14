const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getAllKonseling,
  getKonselingById,
  addNewKonseling,
  deleteKonseling,
  updateKonseling,
} = require("../controllers/konseling.controller");
const {
  getAllLapor,
  getLaporById,
  addNewLapor,
  deleteLapor,
  updateLapor,
} = require("../controllers/lapor.controller");
const route = express.Router();

route.get("/", verifyToken, getAllLapor);
route.get("/:id", verifyToken, getLaporById);
route.post("/", verifyToken, addNewLapor);
route.delete("/:id", verifyToken, deleteLapor);
route.patch("/:id/:status", verifyToken, updateLapor);

module.exports = route;
