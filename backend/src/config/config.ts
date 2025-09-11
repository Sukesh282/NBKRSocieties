import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
