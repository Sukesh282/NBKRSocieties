import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export const globalErrorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);
  res.status(err.statusCode).json({ message: err.message });
};
