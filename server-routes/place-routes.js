const express = require("express");
const placeApiController = require("../server-controller/place-controler");
const { check } = require("express-validator");
const { fileUpload } = require("../server-middlerware/file-upload");
const router = express.Router();
router.get("/", placeApiController.getAllPlaces);
router.get("/:pid", placeApiController.getPlaceById);
router.get("/user/:uid", placeApiController.getPlacesByUserId);
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeApiController.createPlace
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placeApiController.updatePlaceById
);
router.delete("/:pid", placeApiController.deletePlaceById);
module.exports = router;
