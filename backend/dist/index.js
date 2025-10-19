import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.routes";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./lib/db";
import { app, server } from "./lib/socket";
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
server.listen(PORT, () => {
    console.log("server is running on Port:" + PORT);
    connectDB();
});
//# sourceMappingURL=index.js.map