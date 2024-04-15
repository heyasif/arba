const asyncHandler = require("express-async-handler");
const Category = require("../models/Category.model");
const User = require("../models/User.model");

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getSingleCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createCategory = async (req, res) => {
  try {
    const { name, slug, image } = req.body;
    const new_category = await (
      await Category.create({ owner: req.user._id, name, slug, image })
    ).populate("owner");
    res.send({
      error: false,
      message: "Category created successfully.",
      new_category,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateCategory = asyncHandler(async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  const userID_in_category = category.owner;
  const userID_making_req = req.user._id;
  // console.log(userID_in_category, userID_making_req);
  try {
    if (!userID_making_req.equals(userID_in_category)) {
      res.send({ message: "You are not authorized" });
    } else {
      await Category.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated Category successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  const userID_in_category = category.owner;
  const userID_making_req = req.user._id;
  // console.log(userID_in_category, userID_making_req);
  try {
    if (!userID_making_req.equals(userID_in_category)) {
      res.send({ message: "You are not authorized" });
    } else {
      await Category.findByIdAndDelete({ _id: id });
      res.send("Deleted Category successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
