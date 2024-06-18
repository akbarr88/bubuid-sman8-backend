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
          role: user.role,
        },
        process.env.JWT_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
      });
      res.json({
        message: "berhasil login",
        token,
        id_user: user.id,
        role: user.role,
      });
    } catch (error) {
      res.status(400).json(error.message);
    }
  },

  register: async (req, res) => {
    const data = req.body;
    console.log(data);

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
      data.umur = Number(data.umur);

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
