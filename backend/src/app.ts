import express from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import userRouter from "./user/userRouter.js";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Iam alive !");
});

// Global error handler should be the last middleware
app.use(globalErrorHandler);
app.use("/api/users", userRouter);
