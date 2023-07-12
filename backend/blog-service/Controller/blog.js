const ErrorResponse = require("dev-camper-api/utils/errorResponse");
const Blog = require("../model/Blog");

const ISODate = require("isodate");
const moment = require("moment");
const { formatISO, parseISO } = require("date-fns");
const produceMessage = require("../config/kafkaProducerConfig");

exports.getBlogs = async (req, res, next) => {
  let query;
  if (req.query.category) {
    query = { category: req.query.category };
  }

  if (req.query.toDate && req.query.fromDate) {
    const { fromDate, toDate } = req.query;
    query = {
      ...query,
      createdAt: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      },
    };
  }
  console.log(query);
  try {
    const blogs = await Blog.find(query);

    console.log(blogs.length);

    if (!blogs) {
      throw new ErrorResponse(`No blogs found!`, 404);
    }

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
    await produceMessage("all blogs fetched from DB");
  } catch (error) {
    next(error);
  }
};

exports.getBlogsByDates = async (req, res, next) => {
  console.log(req.query);
};

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw new ErrorResponse(`Blog not found with id : ${req.params.id}`, 404);
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  const user = req.headers["x-current-user"];
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      throw new ErrorResponse(`Blog not found with id : ${req.params.id}`, 404);
    }

    //check if the user is the owner
    if (blog.user.toString() !== user) {
      throw new ErrorResponse(
        `User with id ${user} is not authorized to update this blog`,
        400
      );
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.getMyBlogs = async (req, res, next) => {
  let query;
  const user = req.headers["x-current-user"];

  query = { ...req.query, user };

  try {
    const blogs = await Blog.find(query);

    if (!blogs) {
      throw new ErrorResponse(`No blogs found for user ${user}`, 404);
    }
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

exports.addBlog = async (req, res, next) => {
  req.body.user = req.headers["x-current-user"];

  console.log(req.headers["x-current-user"]);
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const user = req.headers["x-current-user"];

  console.log(user);
  console.log(req.params.id);
  try {
    const blog = await Blog.findById(req.params.id);

    console.log(blog);

    if (!blog) {
      throw new ErrorResponse(`Blog not found with id : ${req.params.id}`, 404);
    }
    // console.log(blog);
    //check if the user is the owner
    if (blog.user.toString() !== user) {
      throw new ErrorResponse(
        `User with id ${user} is not authorized to delete this blog`,
        400
      );
    }
    blog.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
