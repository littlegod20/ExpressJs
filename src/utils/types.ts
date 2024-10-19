import { Request as ExpressRequest } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Data {
  id?: number;
  name?: string;
  email?: string;
  hashedPassword?: string;
  passenger?: string;
  flight?: string;
}

export interface UserPayload extends JwtPayload {
  name: string;
  password: string;
  // Add other properties that are in your JWT payload
}

export interface RequestWithUser extends ExpressRequest {
  user?: UserPayload;
}
