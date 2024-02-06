import express from "express";
import {
  signup,
  login,
  logout,
  currentUser,
} from "../../controllers/user-controllers.js";
import { auth } from "../../config/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/logout", logout);

userRouter.get("/cuttrent", currentUser, auth);

export default userRouter;
