import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config.js";
import UserModel from "../user/userModel.js";
import { User } from "../user/userTypes.js";
import createHttpError from "http-errors";

export interface CustomRequest extends Request {
  user?: User;
}

export const protectedRoute = async (
  req: CustomRequest,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return next(createHttpError(401, 'Access token not found'));
  }
  try {
    const jwtUser = jwt.verify(accessToken, config.jwtSecret as string);
    const user = await UserModel.findById((jwtUser as JwtPayload).userId);
    if (!user) {
      const error = createHttpError(401, "User not found");
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
