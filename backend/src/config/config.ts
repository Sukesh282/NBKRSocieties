import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || "development",
};

export const config = Object.freeze(_config);
