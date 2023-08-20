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
const swaggerUI = require("swagger-ui-express");
const promClient = require("prom-client");

const DbConnect = require("./config/db");
const User = require("./model/User");
const ErrorResponse = require("./utils/ErrorResponse");
const errorHandler = require("./middleware/errorHandler");
const specs = require("./utils/swagger");

//routes
const blogs = require("./routes/blog");

//dotenv config
dotenv.config({ path: "config/config.env" });

//db connection
DbConnect();

const app = express();

//api-docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//body parser
app.use(express.json());

//logger
app.use(
  morgan("combined", {
    skip: (req, res) => req.url === "/metrics?",
  })
);

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//prevent xss attacks
app.use(xss());

//rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 500, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

//prevent http param pollution
app.use(hpp());

//allow cors
app.use(cors());

//routes
app.use("/api/v1/auth", blogs);

//prometheus
// Create a new Registry to store all metrics
const registry = new promClient.Registry();

// Set the default metrics
promClient.collectDefaultMetrics({ register: registry });

// Expose the metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", promClient.register.contentType);
    const metrics = await registry.metrics();
    res.status(200).end(metrics);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.use(errorHandler);

const port = process.env.PORT || 8000;

const server = app.listen(
  port,
  console.log(`auth-server started running on port ${port}`.yellow.bold)
);

//handle unhandled promises
process.on("unhandledRejection", (err, Promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
