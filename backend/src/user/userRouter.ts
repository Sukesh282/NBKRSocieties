import { Router } from "express";
import {
  createUser,
  loginUser,
  refreshAccessToken,
  sendOTPMail,
  verifyEmail,
} from "./userController.js";
import { protectedRoute } from "../middlewares/protected.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh", refreshAccessToken);

//protected routes
userRouter.post("/sendmail", protectedRoute, sendOTPMail);
userRouter.post("/verifyotp", protectedRoute, verifyEmail);

export default userRouter;
