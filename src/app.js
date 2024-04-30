import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes.js";

// app

const app = express();

// middlewares

app.use(express.json()); // json
app.use(cors()); // cors

app.use("/", authRoutes); // routes

export default app;
