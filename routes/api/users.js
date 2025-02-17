import express from "express";
import {
  signup,
  login,
  logout,
  currentUser,
  updateAvatar,
  verifyUser,
  resendMail,
} from "../../controllers/user-controllers.js";
import { auth } from "../../config/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", auth, login);

userRouter.post("/logout", auth, logout);

userRouter.get("/current", auth, currentUser);

userRouter.patch("/avatars", updateAvatar, auth);

userRouter.get("/verify/:verificationToken", verifyUser);

userRouter.post("/verify", resendMail);

export default userRouter;
