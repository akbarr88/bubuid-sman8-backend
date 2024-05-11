const express = require("express");
const { getAllUser, getUserById, getUserKonseling } = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth");
const route = express.Router()

route.get("/", getAllUser)
route.get("/:id",verifyToken, getUserById)
route.get("/:id/konseling", verifyToken, getUserKonseling)

module.exports = route