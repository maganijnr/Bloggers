import mongoose from "mongoose";

const BlogModel = mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		genre: { type: String, required: true },
		creator: { type: mongoose.ObjectId, ref: "User" },
		imageUrl: { type: String },
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", BlogModel);

export default Blog;
