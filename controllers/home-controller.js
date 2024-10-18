const { writeToFile } = require("../services/writeFileFunc");

const signUp = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name && !password) {
      return res.status(400).json({
        success: false,
        msg: "please attach user credentials to the request body.",
      });
    }

    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, hashedPassword };

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
