const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.route("/").post(protect, createProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/:id").patch(protect, updateProduct);
router.route("/:id").delete(protect, deleteProduct);


module.exports = router;
