const express = require("express");
const app = express();
const allRoutes = require("./routes");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("./config/cloudinary");

const PORT = process.env.PORT || 3000;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "imagebackend",
    format: async (req, file) => "jpg",
    public_id: (req, file) => `${file.originalname.split(".")[0]}${Date.now()}`,
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const finalImageUrl = req.file.path;
    res.json({ status: "succes", imageUrl: finalImageUrl });
  } catch (error) {
    res.json({ status: "failed", error: error });
  }
});
app.use(allRoutes);

app.listen(PORT, () => {
  console.log("Server Berjalan di PORT " + PORT);
});
