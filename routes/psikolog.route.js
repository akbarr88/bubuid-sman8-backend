const express = require("express");
const {
  getAllPsikolog,
  getPsikologById,
  addNewPsikolog,
  deletePsikolog,
  updatePsikolog,
  getPsikologKonseling,
} = require("../controllers/psikolog.controller");
const verifyToken = require("../middleware/auth");
const route = express.Router();

route.get("/",verifyToken, getAllPsikolog);
route.get("/:id",verifyToken, getPsikologById);
route.post("/",verifyToken, addNewPsikolog);
route.delete("/:id",verifyToken, deletePsikolog);
route.put("/:id",verifyToken, updatePsikolog);
route.get("/:id/konseling", verifyToken , getPsikologKonseling)

module.exports = route;
