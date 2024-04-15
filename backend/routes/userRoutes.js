const express = require("express");
const router = express.Router();
const {registerUser, loginUser, updateUser} = require("../controllers/userControllers");



router.route("/").post(registerUser)
router.post("/login", loginUser);
router.patch("/:id", updateUser);

module.exports = router;