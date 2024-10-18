const bcrypt = require("bcrypt");
const fs = require("fs");

const createAbsolutePath = require("../services/projectRoot");

const file = createAbsolutePath("/presentation/utils/users.json");

const validator = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!fs.existsSync(file)) {
    return res
      .status(404)
      .json({ success: false, msg: "Please sign up with details first" });
  }

  users = JSON.parse(fs.readFileSync(file, "utf-8"));
  user = users.find((item) => item.name === name && item.email === email);

  if (!users) {
    return res
      .status(400)
      .json({ success: false, msg: "Please signup first!" });
  }

  if (!user) {
    return res
      .status(400)
      .json({ success: false, msg: "No user matches your credentials" });
  }

  try {
    if (await bcrypt.compare(password, user.hashedPassword)) {
      next();
    } else {
      return res.json({
        success: false,
        msg: "Password does not match stored credential.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An internal server error occured");
  }
};

module.exports = validator;
