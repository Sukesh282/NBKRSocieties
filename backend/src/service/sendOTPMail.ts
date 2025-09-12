import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.googleAppUsername,
    pass: config.googleAppPassword,
  },
});

export const sendOTPMail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `"NBKRIST Societies" <${config.googleAppUsername}>`,
    to: to,
    subject: "OTP for Email Verification",
    html: `<b>Hello ${to}, Your otp is ${otp}</b>`,
  });
};
