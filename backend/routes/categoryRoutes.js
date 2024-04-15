const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.route("/").get(getCategories);
router.route("/:id").get(getSingleCategory);
router.route("/").post(protect, createCategory);
router.route("/:id").patch(protect, updateCategory);
router.route("/:id").delete(protect, deleteCategory);

module.exports = router;

