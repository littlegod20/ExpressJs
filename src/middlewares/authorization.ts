import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import { RequestWithUser, UserPayload } from "../utils/types";
dotenv.config();

export default function authorizationToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ msg: "Unauthorized, Access denied" });
    return;
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    res.status(500).send("Server error: undefined secret key");
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ msg: "Token has expired." });
      return;
    }
    req.user = user as UserPayload;
    next();
  });
}
