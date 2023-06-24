const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const colors = require("colors");

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blog");
const errorHandler = require("./middleware/errorHandler");

//dotenv config
dotenv.config({ path: "config/config.env" });

//DB connection
connectDB();

const app = express();

//body parser
app.use(express.json());

//routes
app.use("/api/v1/blogsite/blog", blogRoutes);

//error handler
app.use(errorHandler);

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`server started running in ${port}`.yellow.bold);
});
