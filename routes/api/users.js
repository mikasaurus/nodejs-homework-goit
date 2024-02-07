import express from "express";
import {
  signup,
  login,
  logout,
  currentUser,
  updateAvatar,
} from "../../controllers/user-controllers.js";
import { auth } from "../../config/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", auth, signup);

userRouter.post("/login", auth, login);

userRouter.post("/logout", auth, logout);

userRouter.get("/current", currentUser, auth);

userRouter.patch("/avatars", updateAvatar, auth);

export default userRouter;
