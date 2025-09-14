import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.googleAppUsername,
    pass: config.googleAppPassword,
  },
});

export const sendOTPMail = async (to: string, otp: string, name: string) => {
  const templatePath = path.join(
    process.cwd(),
    "backend/src/templates/otpEmail.ejs",
  );
  const html = await ejs.renderFile(templatePath, { otp, to, name });

  await transporter.sendMail({
    from: `"NBKRIST Societies" <${config.googleAppUsername}>`,
    to: to,
    subject: "OTP for Email Verification",
    html: html,
  });
};
