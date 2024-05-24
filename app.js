const express = require("express");
const app = express();
const allRoutes = require("./routes");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(allRoutes);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("Server Berjalan di PORT " + PORT);
});
