const mongoose = require("mongoose");
const ISODate = require("isodate");

/**
 * @openapi
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - blogName
 *         - category
 *         - article
 *         - authorName
 *       properties:
 *         blogName:
 *           type: string
 *           description: Name of the Blog
 *         category:
 *           type: string
 *           description: Tag that the blog is related to
 *         article:
 *           type: string
 *           description: Content of the blog
 *         authorName:
 *            type: string
 *            description: Author of the blog
 *       example:
 *         blogName: Mastering the Art of Public Speaking
 *         category: Communication
 *         article: Public speaking is a skill that can greatly impact your personal and professional life. Whether it's delivering a persuasive presentation, leading a team meeting, or speaking at a conference, effective communication is key to conveying your message with confidence and influence. This blog delves into the art of public speaking, providing practical tips on overcoming stage fright, structuring compelling speeches, utilizing body language, and engaging your audience. From analyzing famous speeches to practicing vocal techniques, discover the secrets to mastering the art of public speaking and becoming a compelling and influential speaker. Public speaking is a skill that can greatly impact your personal and professional life. Whether it's delivering a persuasive presentation, leading a team meeting, or speaking at a conference, effective communication is key to conveying your message with confidence and influence. This blog delves into the art of public speaking, providing practical tips on overcoming stage fright, structuring compelling speeches, utilizing body language, and engaging your audience. From analyzing famous speeches to practicing vocal techniques, discover the secrets to mastering the art of public speaking and becoming a compelling and influential speaker
 *         authorName: Alexandra Davis
 */

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: The Blog CRUD API
 */

const BlogSchema = new mongoose.Schema({
  blogName: {
    type: String,
    minlength: [20, "Blog name should be minimun of 20 characters"],
    required: [true, "Please add blogName"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    minlength: [3, "Category should be minimun of 3 characters"],
  },
  article: {
    type: String,
    required: [true, "Please add a article"],
    minlength: [1000, "Article should be minimun of 1000 characters"],
  },
  authorName: {
    type: String,
    required: [true, "Please add a Author"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
