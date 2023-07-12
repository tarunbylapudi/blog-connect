const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "A simple Auth API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js", "./model/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
