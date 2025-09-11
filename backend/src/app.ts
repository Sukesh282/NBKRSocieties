import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

// Global error handler should be the last middleware
app.use(globalErrorHandler);
