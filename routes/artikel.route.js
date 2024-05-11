const express = require('express');
const { getAllArtikel, getArtikelById, addNewArtikel, deleteArtikel, updateArtikel } = require('../controllers/artikel.controller');
const verifyToken = require('../middleware/auth');
const route = express.Router()


route.get ("/", verifyToken ,getAllArtikel)
route. get ("/:id", verifyToken, getArtikelById)
route.post ("/",verifyToken, addNewArtikel)
route.delete ("/:id",verifyToken, deleteArtikel)
route.put ("/:id",verifyToken, updateArtikel)

module. exports = route