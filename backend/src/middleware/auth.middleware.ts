import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

type DecodedToken = JwtPayload & {
  userId: string;
};

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({
        message: "non autorizzato - token mancante.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded !== "object" || !decoded.userId) {
      return res.status(401).json({
        message: "non autorizzato - token non valido.",
      });
    }
    const { userId } = decoded as DecodedToken;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "utente non trovato.",
      });
    }
    (req as any).user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "errore server",
    });
  }
};
