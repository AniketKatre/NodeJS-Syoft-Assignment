const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const productRouter = require("./routes/productRoutes");
const PORT = process.env.PORT || 3080;
const app = express();

//mongoDB config
connectDB();

//middleware
app.use(express.json());

//routes
app.use("/", userRouter);
app.use("/", productRouter);

// error handler middleware
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
