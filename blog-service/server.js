const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const colors = require("colors");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blog");
const errorHandler = require("./middleware/errorHandler");
const swaggerUI = require("swagger-ui-express");
const specs = require("./utils/swagger");

//dotenv config
dotenv.config({ path: "config/config.env" });

//DB connection
connectDB();

const app = express();

//api-docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//body parser
app.use(express.json());

//logger
app.use(morgan("dev"));

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//prevent xss attacks
app.use(xss());

//rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

//prevent http param pollution
app.use(hpp());

//allow cors
app.use(cors());

//routes
app.use("/api/v1/blogs", blogRoutes);

//error handler
app.use(errorHandler);

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`server started running in ${port}`.yellow.bold);
});
