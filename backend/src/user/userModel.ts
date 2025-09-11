import mongoose from "mongoose";
import { User } from "./userTypes.js";

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollnumber: {
      type: String,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "coremember", "director", "hod", "admin"],
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
