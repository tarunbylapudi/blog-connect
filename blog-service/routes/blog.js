const express = require("express");

const { addBlog } = require("../Controller/blog");

const router = express.Router();

router.route("/create").post(addBlog);

module.exports = router;
