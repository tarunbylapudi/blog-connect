const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//dotenv config
dotenv.config({ path: "config/config.env" });

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: password of the user
 *       example:
 *         name: My Name
 *         email: email@email.com
 *         password: MyPassword@123
 *
 *     registerResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: status of the request
 *          data:
 *            type: string
 *            description: token
 * 
 *     loginBody:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: User registered email
 *          password:
 *            type: string
 *            description: User password
 *    
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Auth Service
 */

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Please add a valid Password",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashing password before save
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//password compare
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//sign jwt and return
UserSchema.methods.getSignedJwtToken = function () {
  console.log("jwt");
  console.log(process.env.JWT_SECRECT, process.env.JWT_TOKEN_EXPIRE);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRECT, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });
};

module.exports = mongoose.model("User", UserSchema);
