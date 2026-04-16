import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ debug: true });

export const signup = async (username: string, password: string) => {
  const exists = await User.findOne({ username });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
  });

  return user;
};

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "20m" },
  );

  const refreshToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "1d" },
  );

  return { accessToken, refreshToken };
};
