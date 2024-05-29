const express = require("express");
require("dotenv").config();
const PORT = 3000;
const app = express();

//mongoDB config

//middleware
app.use(express.json());

//routes

//error handler middleware

//server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
