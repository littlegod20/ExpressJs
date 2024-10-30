import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Data } from "../utils/types";
import { User } from "../models/user.models";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email } = req.body;

  try {
    if (!name && !password) {
      res.status(400).json({
        success: false,
        msg: "please attach user name and password to the request body.",
      });
      return;
    }

    // hash user password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: Data = { name, email, hashedPassword };

    const savedUser = await User.create(user);

    res.status(201).json({
      success: true,
      msg: `${savedUser.name} has signed up successfully🎉.`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("An internal server error occured");
    return;
  }
};
