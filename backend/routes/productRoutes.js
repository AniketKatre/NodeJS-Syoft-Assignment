const productController = require("../controllers/productController");
const express = require("express");
const productRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

//CRUD
// CREATED by ------   @ADMIN
productRouter.post(
  "/api/product/create",
  authMiddleware(["admin"]),
  productController.createProduct
);

// GET List by ------   @ADMIN && @Manager
productRouter.get(
  "/api/product/getlist",
  authMiddleware(["admin", "manager"]),
  productController.getListProduct
);
// UPDATE by ------   @ADMIN && @Manager
productRouter.put(
  "/api/product/update/:id",
  authMiddleware(["admin", "manager"]),
  productController.updateProduct
);
// DELETE by ------   @ADMIN
productRouter.delete(
  "/api/product/delete/:id",
  authMiddleware(["admin"]),
  productController.deleteProduct
);

module.exports = productRouter;
