const Blog = require("../model/Blog");

exports.getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
};

exports.addBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};
