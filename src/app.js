import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes.js";

// app

const app = express();

// middlewares
app.use(morgan("dev")); // morgan
app.use(cookieParser()); // cookieParser
app.use(express.json()); // json
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // cors

app.use("/", authRoutes); // authRoutes

export default app;
