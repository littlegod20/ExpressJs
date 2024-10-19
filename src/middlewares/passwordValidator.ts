import bcrypt from "bcrypt";
import fs from "fs";
import createAbsolutePath from "../services/projectRoot";
import { NextFunction, Request, Response } from "express";
import { Data } from "../utils/types";

const file = createAbsolutePath("utils/users.json");

const validator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, password, email } = req.body;

  if (!fs.existsSync(file)) {
    res
      .status(404)
      .json({ success: false, msg: "Please sign up with details first" });
    return;
  }

  const users: Data[] = JSON.parse(fs.readFileSync(file, "utf-8"));
  const user = users.find((item) => item.name === name && item.email === email);

  if (!users) {
    res.status(400).json({ success: false, msg: "Please signup first!" });
    return;
  }

  if (!user) {
    res
      .status(400)
      .json({ success: false, msg: "No user matches your credentials" });
    return;
  }

  try {
    if (
      user.hashedPassword &&
      (await bcrypt.compare(password, user.hashedPassword))
    ) {
      next();
    } else {
      res.json({
        success: false,
        msg: "Password does not match stored credential.",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An internal server error occured");
  }
};

export default validator;
