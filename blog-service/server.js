const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDB = require("./config/db");

//dotenv config
dotenv.config({ path: "config/config.env" });

//DB connection
connectDB();

const app = express();



const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`server started running in ${port}`.yellow.bold);
});
