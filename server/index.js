import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import uploadRouter from "./routes/upload.route.js";
import subCategory from "./routes/subCategory.route.js";
import productRouter from "./routes/product.route.js";

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
app.use(morgan("combined"));
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

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategory);
app.use("/api/product", productRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running", PORT);
    });
});
