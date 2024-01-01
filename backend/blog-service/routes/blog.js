const express = require("express");

const {
  addBlog,
  deleteBlog,
  getBlogs,
  getMyBlogs,
  getBlog,
  updateBlog,
} = require("../Controller/blog");

const advancedResults = require("../middleware/advancedResults");
const Blog = require("../model/Blog");

const router = express.Router();

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */

/**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */

router.route("/").get(getBlogs).post(addBlog);
router.route("/create").post(addBlog);

/**
 * @swagger
 * /api/v1/blogs/myBlogs:
 *   get:
 *     summary: Returns the list of all the blogs of current logged in user
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: The list of the blogs created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.route("/myBlogs").get(getMyBlogs);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get the blog by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog details by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The blog was not found
 */

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   put:
 *     summary: Update the blog by id
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog details updated
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The blog was not found
 */

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: delete the blog by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog deleted
 *         contens:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolen
 *                  description: status of the request
 *                 data:
 *                  type: object
 *                  description: returns an empty object when the request is successfull
 *       404:
 *         description: The blog was not found
 */

router.route("/:id").get(getBlog).delete(deleteBlog).put(updateBlog);

router.route("/delete/:id").delete(deleteBlog);
router.route("/update/:id").put(updateBlog);

module.exports = router;
