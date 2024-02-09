import { User } from "../schema/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { updateUser } from "../models/users.js";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";
const SECRET_JWT = process.env.SECRET;

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "Email in use" });
  }
  const newUser = new User({ email, userAvatar });
  newUser.setPassword(password);
  const userAvatar = gravatar.url(email);
  await newUser.save();
  const savedUser = await User.findOne({ email });
  return res.status(201).json({ savedUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, SECRET_JWT, { expiresIn: "1h" });
  await updateUser(user.id, { token });
  return res.status(200).json({ token, user });
};

export const logout = async (req, res) => {
  const userId = req.user.id;
  await updateUser(userId, { token: null });
  return res.status(204).json({ message: "No Content" });
};

export const currentUser = async (req, res) => {
  const { email } = req.body;
  res.status(200).json({ email });
};

export const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpPath, filename } = req.file;
  const newPath = path.join(__dirname, "..", "public", "avatars", filename);
  const avatar = await Jimp.read(tmpPath);
  await avatar.resize(250, 250).quality(60).write(newPath);
  await fs.unlink(tmpPath);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};
