const express = require("express");

const { register, login, tarun } = require("../controller/blog.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
