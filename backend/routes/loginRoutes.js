const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      const errorMessage =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return res.status(409).json({ error: errorMessage });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.DEPLOYED === "true",
      sameSite: process.env.DEPLOYED === "true" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res
      .status(201)
      .json({ message: "new user registered", username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error. Couldn't register user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const foundUser = await Users.findOne({ username });
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.DEPLOYED === "true",
      sameSite: process.env.DEPLOYED === "true" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res
      .status(200)
      .json({ message: "User logged in", username: foundUser.username });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error. Failed to log in." });
  }
});

router.get("/verify", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access." });
  }
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
    return res.status(401).json({ error: "Unauthorized access." });
  }
});

module.exports = router;
