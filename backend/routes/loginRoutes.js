const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    res.json({message: "login successful"});
})

router.post("/login", (req, res) => {
    const {username, password} = req.body;
    console.log(username);
    console.log(password);
    res.json({message: "login successful"});
})

module.exports = router;