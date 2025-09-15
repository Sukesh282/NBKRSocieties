import express from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import userRouter from "./user/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (_req, res) => {
  res.send("Iam alive !");
});

// Global error handler should be the last middleware
app.use(globalErrorHandler);
app.use("/api/users", userRouter);
