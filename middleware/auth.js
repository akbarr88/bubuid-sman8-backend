const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) throw new Error("invalid header");
    token = header.split(" ")[1];
    if (!token) throw new Error("invalid token");
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = verifyToken;
