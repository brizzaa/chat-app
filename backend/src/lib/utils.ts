import jwt from "jsonwebtoken";

export const generateToken = (userId: any, res: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  const isCrossDomain =
    process.env.FRONTEND_URL &&
    process.env.FRONTEND_URL !== "http://localhost:5173";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 giorni in ms
    httpOnly: true, // cross side script prevention
    sameSite: isCrossDomain ? "none" : "lax",
    secure: isCrossDomain,
  });
  return token;
};
