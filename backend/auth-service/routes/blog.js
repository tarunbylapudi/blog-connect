const express = require("express");

const { register, login, tarun } = require("../controller/blog.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/registerResponse'
 *       500:
 *         description: Some server error
 */
router.route("/register").post(register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: user login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginBody'
 *     responses:
 *       200:
 *         description: The user logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/registerResponse'
 *       500:
 *         description: Some server error
 */
router.route("/login").post(login);

module.exports = router;
