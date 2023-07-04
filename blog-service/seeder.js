const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const { json } = require("body-parser");

//load env vars
dotenv.config({ path: "config/config.env" });

//load modal
const Blog = require("./model/Blog");

//connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//read json
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/_data/blogs.json`));

//import to DB
const importData = async () => {
  try {
    await Blog.create(blogs);
    console.log("Data Imported...".green.inverse);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//delete data in DB

const deleteData = async () => {
  try {
    await Blog.deleteMany();
    console.log("Data destroyed...".red.inverse);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

//script

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
