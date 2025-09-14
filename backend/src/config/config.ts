import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || "development",
  googleAppPassword: process.env.GOOGLE_APP_PASSWORD,
  googleAppUsername: process.env.GOOGLE_APP_USERNAME,
  otpExpiryMs: process.env.OTP_EXPIRY_MS
    ? parseInt(process.env.OTP_EXPIRY_MS, 10)
    : 15 * 60 * 1000, // default to 15 minutes
};

export const config = Object.freeze(_config);
