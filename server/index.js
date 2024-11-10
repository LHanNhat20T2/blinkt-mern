import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";

dotenv.config();
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
    helmet({
        crossOriginOpenerPolicy: false,
    })
);

const PORT = 4000 || process.env.PORT;

app.get("/", (req, res) => {
    res.json({
        message: "serve is running " + PORT,
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running", PORT);
    });
});
