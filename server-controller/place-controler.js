const { validationResult } = require("express-validator");
const { getCoordsForAddress } = require("../server-utils/location");
const fs = require("fs");
const HttpError = require("../server-models/HttpError/HttpError.model");
const Place = require("../server-models/Place/Place.model");
const User = require("../server-models/User/User.model");
const { default: mongoose } = require("mongoose");
exports.getAllPlaces = async (req, res, next) => {
  const places = await Place.find();
  res.status(200).json(places);
};

exports.getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError("Could not find a place with the provided id", 422)
    );
  }
};
exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    const places = await Place.find({ creator: userId });
    if (!places || places.length === 0) {
      const error = new HttpError(
        "Could not find a place for the provided id",
        404
      );
      return next(error);
    }
    res.json({
      places: places.map((place) => place.toObject({ getters: true })),
    });
  } catch (error) {
    return next(error);
  }
};
exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data!", 422));
  }
  const { title, description, address, creator } = req.body;
  let location;
  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location,
    address,
    creator,
    imageUrl: req.file.path,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong when finding user, please try again",
        404
      )
    );
  }
  if (!user) {
    return next(new HttpError("User does not exist.", 403));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

exports.updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data!", 422));
  }
  const { title, description } = req.body;
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (error) {
    return next(new HttpError("Place is not found", 404));
  }
  if (place.creator.id !== req.userId) {
    return next(
      new HttpError("You are not allowed to perform this action", 401)
    );
  }

  place.description = description;
  place.title = title;

  try {
    await place.save();
  } catch (error) {
    return next(new HttpError("Something went wrong when deleting the data"));
  }
  res.status(201).json({ place });
};
exports.deletePlaceById = async (req, res, next) => {
  const pid = req.params.pid;
  let place;
  try {
    place = await Place.findById(pid).populate("creator");
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  if (!place) {
    return next(new HttpError("Place does not exist", 422));
  }
  if (place.creator.id !== req.userId) {
    return next(
      new HttpError("You are not allowed to perform this action", 401)
    );
  }
  try {
    fs.unlink(place.imageUrl);
  } catch (error) {
    return next(new HttpError("Something went wrong when saving the data"));
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({ session });
    place.creator.places.pull(place);
    await place.creator.save({ session });
    session.commitTransaction();
  } catch (error) {
    return next(new HttpError("Something went wrong when deleting the data"));
  }

  res.status(201).json({ message: "Deleted place" });
};
