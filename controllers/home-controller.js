const { writeToFile } = require("../services/writeFileFunc");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name && !password) {
      return res.status(400).json({
        success: false,
        msg: "please attach user name and password to the request body.",
      });
    }

    // hash user password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, hashedPassword };

    // save user credentials to users.json file
    writeToFile("users.json", user);

    res.status(201).json({
      success: true,
      msg: `${user.name} has signed up successfully🎉.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An internal server error occured");
  }
};

module.exports = signUp;
