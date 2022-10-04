import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
	"/",
	asyncHandler((req, res) => {
		res.json("Get all blog routes");
	})
);

export default router;
