import express from "express";
import dotenv from "dotenv";
dotenv.config({ debug: true });
import accountRoutes from "./routes/accountRoutes.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.port || 4000;
app.use(cookieParser());
app.options("(.*)", cors());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", credentials, accountRoutes);

app.listen(port, () => {
  return `App is listening on port ${port}`;
});
