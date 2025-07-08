const swaggerAutogen = require("swagger-autogen")();

const doc = {
  insfo: {
    title: "CSE341 Contacts API",
    description: "API for managing contacts in CSE341 course",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
