import express from "express";
import {
	createBlog,
	deleteBlog,
	getAllBlogs,
	getSingleBlog,
} from "../controllers/blogController.js";
import { protectBlogCreate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protectBlogCreate, createBlog).get(getAllBlogs);
router.route("/:id").get(getSingleBlog).delete(protectBlogCreate, deleteBlog);

export default router;
