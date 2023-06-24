const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const colors = require("colors");

const DbConnect = require("./config/db");
const User = require("./model/User");
const ErrorResponse = require("./utils/ErrorResponse");
const ErrorHandler = require("./middleware/ErrorHandler");

//routes
const blogs = require("./routes/blog");

//dotenv config
dotenv.config({ path: "config/config.env" });

//db connection
DbConnect();

const app = express();

//body parser
app.use(express.json());

//routes
app.use("/api/v1/blogsite/user", blogs);

app.use(ErrorHandler);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`server started running in ${port}`.yellow.bold);
});

//handle unhandled promises
process.on("unhandledRejection", (err, Promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
