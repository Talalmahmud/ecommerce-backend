import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import { connectDB } from "./src/config/db.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api

app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error." });
});

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});
app.listen(8000, () => console.log("Server is running on port :8000"));
