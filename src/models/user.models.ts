import mongoose, { Schema } from "mongoose";
import { UserPayload } from "../utils/types";

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  this.updateAt = new Date();
  next();
});

export const User = mongoose.model<UserPayload>("User", userSchema);
