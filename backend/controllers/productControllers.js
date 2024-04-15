const asyncHandler = require("express-async-handler");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");

const getProducts = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    console.log("categoryId", categoryId);
    const limit = parseInt(req.query.limit);
    let productsQuery = categoryId ? Product.find({ category:categoryId }) : Product.find();
    if (limit) {
      productsQuery = productsQuery.limit(limit);
    }
    const products = await productsQuery.exec();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("product", product);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, description, image, price, category } = req.body;
    const foundCategory = await Category.findOne({ name: category });
    console.log(foundCategory, category);
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const new_product = await (
      await Product.create({
        owner: req.user._id,
        title,
        description,
        image,
        price,
        category: foundCategory._id,
      })
    ).populate("owner");
    res.send({
      error: false,
      message: "Product created successfully.",
      new_product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, image, price, category } = req.body;
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!req.user._id.equals(product.owner)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product" });
    }
    const foundCategory = await Category.findOne({ name: category });
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Product.findByIdAndUpdate(
      id,
      { title, description, image, price, category: foundCategory._id },
      { new: true }
    );
    res.send("Updated Product successfully");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  const userID_in_product = product.owner;
  const userID_making_req = req.user._id;
  try {
    if (!userID_making_req.equals(userID_in_product)) {
      res.send({ message: "You are not authorized" });
    } else {
      await Product.findByIdAndDelete({ _id: id });
      res.send("Deleted Product successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
