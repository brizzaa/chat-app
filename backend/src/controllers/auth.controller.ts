import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

// handling signup
export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    // hash passw con bcrypt
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {}
};
export const login = (req: Request, res: Response) => {
  res.send("login route");
};
export const logout = (req: Request, res: Response) => {
  res.send("logout route");
};
