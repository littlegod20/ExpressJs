import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";

import validator from "../middlewares/emailValidator";
import { signUp } from "../controllers/home-controller";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signUp", signUp);

router.post("/logIn", validator, (req, res) => {
  const username = req.body.name;
  const user = { name: username };
  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET ?? "Secret"
  );
  res.json({ accessToken: accessToken });
});

export default router;
