import mongoose from "mongoose";
import { User } from "./userTypes.js";

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: false, sparse: true },
    rollnumber: { type: String, unique: true, required: false, sparse: true },
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
