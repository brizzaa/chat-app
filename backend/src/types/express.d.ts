import { Document } from "mongoose";

interface UserDocument extends Document {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export {};
