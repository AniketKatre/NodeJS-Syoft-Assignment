const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const productController = {
  //CRUD operation

  // CREATE Product
  //   @admin only
  createProduct: asyncHandler(async (req, res) => {
    const { title, description, inventoryCount } = req.body;
    //validation
    if (!title || !description || !inventoryCount) {
      throw new Error("Please all fields are required to add product");
    }

    const product = await Product.create({
      title,
      description,
      inventoryCount,
    });

    res.status(201).json({ message: "product craeted", product });
  }),

  // GET PRODUCT
  //   @admin and Manager Access
  getListProduct: asyncHandler(async (req, res) => {
    const listProducts = await Product.find();
    res.json(listProducts);
  }),

  // UPDATE PRODUCT
  //   @admin and Manager Access
  updateProduct: asyncHandler(async (req, res) => {
    const { title, description, inventoryCount } = req.body;

    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found...");
    }

    product.title = title;
    product.description = description;
    product.inventoryCount = inventoryCount;

    await product.save();

    res.status(201).json({ message: "product updated....", product });
  }),

  // DELETE PRODUCT
  //   @admin only
  deleteProduct: asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);
    //valdation
    if (!product) {
      throw new Error("Product not found...");
    }

    // //remove
    // await product.deleteOne({ _id: req.params.id });
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Product Deleted Sucessfully...." });
  }),
};

module.exports = productController;
