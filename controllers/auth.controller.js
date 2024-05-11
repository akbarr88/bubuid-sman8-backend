const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = {
  login: async (req, res) => {
    const userLogin = req.body;
    try {
      const user = await User.findOne({
        where: { email: userLogin.email },
      });

      if (!user) throw new Error("email tidak ditemukan");

      const checkPassword = bcrypt.compareSync(
        userLogin.password,
        user.password
      );
      if (!checkPassword) throw new Error("password tidak ditemukan");

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY
      );
      res.json({
        message: "berhasil login",
        token,
        id_user: user.id,
      });
    } catch (error) {
      res.status(400).json(error.message);
    }
  },

  register: async (req, res) => {
    const data = req.body;

    const requiredFields = [
      "nama",
      "email",
      "password",
      "umur",
      "jenis_kelamin",
      "sekolah",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({
          message: `Field '${field}' harus diisi.`,
        });
      }
    }

    try {
      const hashPassword = bcrypt.hashSync(data.password, 10);
      data.password = hashPassword;

      await User.create(data);

      res.status(201).json({
        message: "Berhasil menambahkan user",
      });
    } catch (error) {
      res.status(500).json({
        error: "Gagal menambahkan user",
        message: error.message,
      });
    }
  },
};
