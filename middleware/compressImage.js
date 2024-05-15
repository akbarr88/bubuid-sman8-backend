const sharp = require("sharp");
const path = require("path");

const compressImage = async (req, res, next) => {
  if (!req.file) return next();

  const tempFilePath = `./temp/${Date.now()}-${
    req.file.originalname.split(".")[0]
  }`;

  try {
    await sharp(req.file.buffer).jpeg({ quality: 70 }).toFile(tempFilePath);

    req.file.path = tempFilePath;
    req.file.filename = path.basename(tempFilePath);

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Image processing failed" });
  }
};

module.exports = compressImage;
