import bcrypt from "bcrypt";
import fs from "fs";
import createAbsolutePath from "../services/projectRoot";
import { NextFunction, Request, Response } from "express";
import { Data } from "../utils/types";
import { User } from "../models/user.models";

const file = createAbsolutePath("utils/users.json");

const validator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!(await User.exists({ email: email }))) {
    res
      .status(404)
      .json({ success: false, msg: "Please sign up with details first" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
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
