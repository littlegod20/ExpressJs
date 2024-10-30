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
  email: string;
  password: string;
}

export interface RequestWithUser extends ExpressRequest {
  user?: UserPayload;
}
