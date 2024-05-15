const express = require("express");
const route = express.Router();

const artikelRoute = require("./artikel.route");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const psikologRoute = require("./psikolog.route");
const konselingRoute = require("./konseling.route");
const laporRoute = require("./lapor.routes");
const imageRouter = require("./image.route");

route.get("/", (req, res) => {
  res.json("selamat datang di express sequelize migration");
});

route.use("/artikel", artikelRoute);
route.use("/users", userRoute);
route.use("/auth", authRoute);
route.use("/psikolog", psikologRoute);
route.use("/konseling", konselingRoute);
route.use("/lapor", laporRoute);
route.use("/image", imageRouter);

module.exports = route;
