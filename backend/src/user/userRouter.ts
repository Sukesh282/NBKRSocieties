import { Router } from "express";
import {
  createUser,
  loginUser,
  refreshAccessToken,
  sendOTPMail,
  verifyEmail,
} from "./userController.js";
import { protectedRout } from "../middlewares/protected.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh", refreshAccessToken);

//protected routes
userRouter.post("/sendmail", protectedRout, sendOTPMail);
userRouter.post("/verifyotp", protectedRout, verifyEmail);

export default userRouter;
