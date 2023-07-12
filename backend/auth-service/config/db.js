const mongoose = require("mongoose");
const dotenv = require("dotenv");

//dotenv config
dotenv.config({ path: "config/config.env" });

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    `MongoDB connected : ${conn.connection.name}`.cyan.underline.bold
  );
};

module.exports = connectDB;
