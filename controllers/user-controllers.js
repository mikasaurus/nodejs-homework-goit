import { User } from "../schema/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { updateUser } from "../models/users.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "Email in use" });
  }
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  await newUser.save();
  const savedUser = await User.findOne({ email });
  return res.status(201).json({ savedUser });
};

const secret = process.env.SECRET;

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(secret);
  if (!user || !user.validPassword(password)) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
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
