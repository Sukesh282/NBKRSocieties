import { Router } from "express";
import { createUser, loginUser, refreshAccessToken } from "./userController.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh", refreshAccessToken);

export default userRouter;
