import Blog from "../models/Blog.js";

//@desc create a new blog
//@route POST /api/blogs/
//@access private
export const createBlog = async (req, res) => {
	const { title, content, genre, imageUrl } = req.body;

	const user = req.user;
	if (title === "" || content === "" || genre === "") {
		return res.json({ message: "Please enter all fields" });
	}

	try {
		await Blog.create({
			title,
			content,
			genre,
			imageUrl,
			creator: user,
		});

		return res.json({ message: `Blog was created successfully` });
	} catch (error) {
		return res.json({ message: error.message });
	}
};

//@desc get all blogs
//@route GET /api/blogs/
//@access public
export const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find();

		return res.json({ blogs: blogs });
	} catch (error) {
		return res.json({ message: error.message });
	}
};

//@desc get a single blog
//@route GET /api/blogs/:id
//@access public
export const getSingleBlog = async (req, res) => {
	const blogId = req.params.id;

	try {
		const blog = await Blog.findById({ _id: blogId });

		if (!blog) {
			return res.json({ message: "Blog does not exist" });
		}

		return res.json({ blog: blog });
	} catch (error) {
		return res.json({ message: error.message });
	}
};

//@desc Delete single blog
//@route DELETE /api/blogs/:id
//@access private
export const deleteBlog = async (req, res) => {
	const blogId = req.params.id;

	try {
		await Blog.findByIdAndDelete({ _id: blogId });

		return res.json({ message: "Blog deleted successfully" });
	} catch (error) {
		return res.json({ message: error.message });
	}
};
