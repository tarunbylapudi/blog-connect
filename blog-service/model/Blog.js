const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Blog", BlogSchema);
