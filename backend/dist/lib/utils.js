import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 giorni in ms
        httpOnly: true, // cross side script prevention
        sameSite: isProduction ? "none" : "lax", // none per cross-site in produzione
        secure: isProduction, // sempre true in produzione per sameSite=none
    });
    return token;
};
//# sourceMappingURL=utils.js.map