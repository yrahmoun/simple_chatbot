const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

async function verifyToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized access.", unauthorized: true });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const user = await Users.findById(userId);
    if (!user) {
      res.cookie("accessToken", "", {
        httpOnly: true,
        secure: process.env.DEPLOYED === "true",
        sameSite: process.env.DEPLOYED === "true" ? "none" : "lax",
        expires: new Date(0),
      });
      return res
        .status(401)
        .json({ error: "Unauthorized access.", unauthorized: true });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ error: "Invalid or expired token.", unauthorized: true });
  }
}

module.exports = verifyToken;
