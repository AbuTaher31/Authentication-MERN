import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import mongoDBConnect from "./config/db.js";

//init express
const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//set static
app.use(express.static("api/public"));

//routes

app.use("/auth", userRoutes);

//environment variable
const PORT = process.env.PORT || 3030;

//listen
app.listen(PORT, () => {
  mongoDBConnect();

  console.log(`server is running on  port ${PORT}`.bgGreen.black);
});
