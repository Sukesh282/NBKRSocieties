import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "./userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const error = createHttpError(409, "User already exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};
