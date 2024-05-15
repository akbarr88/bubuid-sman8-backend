const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

module.exports = {
  uploadImage: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
        folder: "imagebackend",
      });

      fs.unlinkSync(req.file.path);

      res.json({ imageUrl: result.secure_url });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Upload failed" });
    }
  },

  deleteImage: async (req, res) => {
    const publicId = req.params.publicId;
    const folderName = "imagebackend";

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    try {
      // Hapus gambar dari Cloudinary
      const result = await cloudinary.uploader.destroy(
        `${folderName}/${publicId}`
      );

      res.json({ result });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  },
};
