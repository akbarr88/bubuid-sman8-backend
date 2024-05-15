const express = require("express");
const { uploadImage, deleteImage } = require("../controllers/image.controller");
const compressImage = require("../middleware/compressImage");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageRouter = express.Router();

imageRouter.post("/upload", upload.single("file"), compressImage, uploadImage);
imageRouter.delete("/delete/:publicId", deleteImage);

module.exports = imageRouter;
