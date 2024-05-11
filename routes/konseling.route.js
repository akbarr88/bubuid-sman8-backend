const express = require('express');
const verifyToken = require('../middleware/auth');
const { getAllKonseling, getKonselingById, addNewKonseling, deleteKonseling, updateKonseling } = require('../controllers/konseling.controller');
const route = express.Router()


route.get ("/", verifyToken, getAllKonseling)
route.get ("/:id", verifyToken, getKonselingById)
route.post ("/", verifyToken, addNewKonseling)
route.delete ("/:id", verifyToken, deleteKonseling)
route.put ("/:id", verifyToken, updateKonseling)



module.exports = route