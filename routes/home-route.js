require("dotenv").config();
const express = require("express");

const validator = require("../middlewares/passwordValidator");
const signUp = require("../controllers/home-controller");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signUp", signUp);

router.post("/logIn", validator, (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

module.exports = router;
