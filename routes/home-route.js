const express = require("express");

const validator = require("../middlewares/passwordValidator");
const signUp = require("../controllers/home-controller");

const router = express.Router();

router.post("/signUp", signUp);

router.post("/logIn", validator, (req, res) => {
  res.status(200).json({ success: true, msg: "Password is valid" });
});

module.exports = router;
