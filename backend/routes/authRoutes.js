const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

//REGISTER USER ROUTES
userRouter.post("/api/user/register", userController.register);

//LOGIN USER ROUTES
userRouter.post("/api/user/login", userController.login);

module.exports = userRouter;
