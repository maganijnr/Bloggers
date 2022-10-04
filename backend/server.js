import express from "express";
import dotenv from "dotenv";
import colors from "colors";
//Routes
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();

app.use("/api/blogs", blogRoutes);

app.listen(process.env.PORT, () =>
	console.log(`Running on port ${process.env.PORT}`.yellow.bold.underline)
);
