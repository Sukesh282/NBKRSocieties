import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/protected.js";
import createHttpError from "http-errors";
import UserModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { sendOTPMail as sendOTPMailTool } from "../service/sendOTPMail.js";
import crypto from "crypto";

//TODO: use redis to store these details temporarily
export const usersWaitingVerify: {
  [key: string]: { email: string; otp: string; timestamp: number };
} = {};

const getOTP = (): string => crypto.randomInt(100000, 999999).toString();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return next(createHttpError(400, "All fields are required"));
  }
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return next(createHttpError(409, "User already exists"));
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

    res.status(201).json({ ...safeUser, message: "User created successfully" });
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
    return next(createHttpError(400, "username and password are required"));
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
      config.jwtSecret as string,
      { expiresIn: "30d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ accessToken, message: "Login successful" });
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
  console.log("Refresh token:", refreshToken);
  if (!refreshToken) {
    return next(createHttpError(401, "Refresh token not found"));
  }

  try {
    const payload = jwt.verify(refreshToken, config.jwtSecret as string) as {
      userId: string;
      role: string;
    };

    const user = await UserModel.findById(payload.userId);

    const accessToken = jwt.sign(
      { userId: payload.userId, role: payload.role },
      config.jwtSecret as string,
      { expiresIn: "15m" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({
      name: user?.name,
      email: user?.email || null,
      username: user?.username,
      role: user?.role,
      accessToken,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

export const sendOTPMail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(createHttpError(401, "Unauthorized"));
  }

  try {
    const { email } = req.body;

    if (!email) {
      return next(createHttpError(400, "Email is required"));
    }

    const otp = getOTP();

    const timestamp: number = Date.now();
    usersWaitingVerify[req.user.username] = { email, otp, timestamp };

    await sendOTPMailTool(email, otp, req.user.name);

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
      return next(createHttpError(400, "OTP is required"));
    }

    if (!req.user) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const userData = usersWaitingVerify[req.user.username];
    if (!userData) {
      return next(createHttpError(400, "No OTP request found"));
    }

    if (userData.otp !== otp) {
      return next(createHttpError(400, "Invalid OTP"));
    }

    const otpExpiryMs = config.otpExpiryMs || 15 * 60 * 1000;

    if (Date.now() - userData.timestamp > otpExpiryMs) {
      delete usersWaitingVerify[req.user.username];
      return next(createHttpError(400, "Expired OTP"));
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

export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(createHttpError(401, "Unauthorized"));
  }

  const user = req.user;

  res.status(200).json({
    username: user.username,
    name: user.name,
  });
};
