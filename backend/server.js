import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectToDb from "./config/dbConfig.js";
import cors from "cors";
//Routes
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
connectToDb();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
	console.log(`Running on port ${process.env.PORT}`.yellow.bold.underline)
);
