import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./lib/db";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on Port:" + PORT);
  connectDB();
});
