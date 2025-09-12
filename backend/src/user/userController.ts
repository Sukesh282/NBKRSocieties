import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middlewares/protected.js";
import createHttpError from "http-errors";
import UserModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { sendOTPMail as sendOTPMailTool } from "../service/sendOTPMail.js";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const error = createHttpError(409, "User already exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      username,
      password: hashedPassword,
      role: "student",
    });
    const savedUser = await newUser.save();

    const safeUser = {
      _id: savedUser._id,
      name: savedUser.name,
      username: savedUser.username,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    res.status(201).json(safeUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const error = createHttpError(400, "username and password are required");
    return next(error);
  }
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      const error = createHttpError(401, "Invalid username or password");
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = createHttpError(401, "Invalid username or password");
      return next(error);
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret as string,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    const error = createHttpError(401, "Refresh token not found");
    return next(error);
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string,
    ) as { userId: string; role: string };

    const accessToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.redirect("/login");
  }
};

export const usersWaitingVerify: {
  [key: string]: { email: string; otp: string };
} = {};

export const sendOTPMail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    const error = createHttpError(401, "Unauthorized");
    return next(error);
  }

  try {
    const { email } = req.body;

    if (!email) {
      const error = createHttpError(400, "Email is required");
      return next(error);
    }

    const otp = Math.floor(100000 + Math.random() * 899999).toString();
    usersWaitingVerify[req.user.username] = { email, otp };
    sendOTPMailTool(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      const error = createHttpError(400, "OTP is required");
      return next(error);
    }

    if (!req.user) {
      const error = createHttpError(401, "Unauthorized");
      return next(error);
    }

    const userData = usersWaitingVerify[req.user.username];
    if (!userData) {
      const error = createHttpError(400, "No OTP request found");
      return next(error);
    }

    if (userData.otp !== otp) {
      const error = createHttpError(400, "Invalid OTP");
      return next(error);
    }

    await UserModel.findByIdAndUpdate(req.user._id, {
      email: userData.email,
    });

    delete usersWaitingVerify[req.user.username];
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};
