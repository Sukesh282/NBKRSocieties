import express from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import userRouter from "./user/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(process.cwd(), "../frontend/dist")));

// Serve the index.html for the root route
app.get("/", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend/dist/index.html"));
});

app.post("/logout", (_req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "logout successful" });
});

app.use("/api/users", userRouter);

// Global error handler should be the last middleware
app.use(globalErrorHandler);
