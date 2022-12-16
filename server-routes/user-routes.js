const express = require("express");
const userController = require("../server-controller/user-controller");
const { check } = require("express-validator");
const router = express.Router();
const { fileUpload } = require("../server-middlerware/file-upload");
router.get("/", userController.getUsers);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);
router.post("/login", userController.login);

module.exports = router;
