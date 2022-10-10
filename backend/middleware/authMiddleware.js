import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectBlogCreate = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({ email: decodedToken.email }).select(
			"-password"
		);

		req.user = user;
		next();
	}

	if (!token) {
		console.log("Not authorized");
		return res.json({ message: "Not authorized" });
	}
};
