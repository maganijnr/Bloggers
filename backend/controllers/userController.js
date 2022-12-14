import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//@desc create a new user
//@route POST /api/auth/register
//@access public
export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	//Input validation
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (name === "" || email === "" || password === "") {
		return res.status(401).json({ message: "Please enter all fields" });
	} else if (!String(email).match(re)) {
		return res.status(401).json({ message: "Please enter a valid email" });
	} else if (password.length < 4) {
		return res.status(401).json({ message: "Password is too short" });
	}

	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(401).json({ message: "User already exist" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({ name, email, password: hashedPassword });

		const token = jwt.sign(
			{ name: user.name, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "3h",
			}
		);

		res.status(201).json({
			name: user.name,
			email: user.email,
			token: token,
		});
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

//@desc login a user
//@route POST /api/auth/login
//@access public
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	//Input validation
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (email === "" || password === "") {
		return res.status(404).json({ message: "Please enter all fields" });
	} else if (!String(email).match(re)) {
		return res.status(401).json({ message: "Please enter a valid email" });
	} else if (password.length < 4) {
		return res.status(401).json({ message: "Password is too short" });
	}

	try {
		const userExist = await User.findOne({ email: email });

		if (!userExist) {
			return res.status(401).json({ message: "User not found" });
		}

		const passwordMatch = await bcrypt.compare(password, userExist.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid password" });
		}

		const token = jwt.sign(
			{ name: userExist.name, email: userExist.email },
			process.env.JWT_SECRET,
			{
				expiresIn: "3h",
			}
		);

		return res.status(201).json({
			name: userExist.name,
			email: userExist.email,
			token: token,
		});
	} catch (error) {
		return res.status(401).json({ message: error.message });
	}
};
