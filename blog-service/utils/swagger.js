const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A simple Express Blog CRUD API",
    },
    servers: [
      {
        url: "http://localhost:8001",
      },
    ],
  },
  apis: ["./routes/*.js", "./model/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
