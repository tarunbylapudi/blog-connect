const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const gateway = require("fast-gateway");
const rateLimit = require("express-rate-limit");
const requestIp = require("request-ip");
const bodyParser = require("body-parser");
const logger = require("./utils/logging");

const protect = require("./middleware/auth");
const morgan = require("morgan");
const ErrorResponse = require("./utils/ErrorResponse");
const conditionalProtect = require("./middleware/conditionalProtect");

dotenv.config({ path: "config/config.env" });

const server = gateway({
  timeout: 5000,
  middlewares: [
    morgan("dev", {
      skip: (req, res) => req.url === "/metrics",
    }),
    require("express-mongo-sanitize")(),
    require("cors")(),
    require("helmet")(),
    require("xss-clean")(),
    require("hpp")(),

    // first acquire request IP
    (req, res, next) => {
      req.ip = requestIp.getClientIp(req);
      return next();
    },
    // second enable rate limiter
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 60, // limit each IP to 60 requests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false,
      handler: (req, res) =>
        res.send("Too many requests, please try again later.", 429),
    }),
  ],
  routes: [
    {
      prefix: "/auth-service",
      target: "http://localhost:8000",
    },
    {
      prefix: "/blog-service",
      target: "http://localhost:8001",
      middlewares: [conditionalProtect],
    },
  ],
});

server
  .start(process.env.PORT || 8002)
  .then(
    console.log(
      `gateway started running in port: ${process.env.PORT}`.yellow.bold
    )
  );
