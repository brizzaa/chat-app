import jwt from "jsonwebtoken";
import User from "../models/user.model";
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({
                message: "non autorizzato - token mancante.",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded !== "object" || !decoded.userId) {
            return res.status(401).json({
                message: "non autorizzato - token non valido.",
            });
        }
        const { userId } = decoded;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "utente non trovato.",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "errore server",
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map