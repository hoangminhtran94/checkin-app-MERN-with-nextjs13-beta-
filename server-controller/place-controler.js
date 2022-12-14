const uuid = require("uuid");
const { validationResult } = require("express-validator");
const { getCoordsForAddress } = require("../server-utils/location");
const HttpError = require("../server-models/HttpError/HttpError.model");
const Place = require("../server-models/Place/Place.model");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

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
    res.json({ places });
  } catch (error) {
    return next(error);
  }
};
exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data!", 422));
  }
  const { title, description, address, creator, imageUrl } = req.body;
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
    imageUrl,
  });
  try {
    await createdPlace.save();
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
  place.description = description;
  place.title = title;

  try {
    await place.save();
  } catch (error) {
    return next(new HttpError("Something went wrong when saving the data"));
  }
  res.status(201).json({ place });
};
exports.deletePlaceById = async (req, res, next) => {
  const pid = req.params.pid;
  let place;
  try {
    place = await Place.findById(pid);
  } catch (error) {
    return next(new HttpError("Place is not found", 404));
  }

  try {
    await place.remove();
  } catch (error) {
    return next(new HttpError("Something went wrong when deleting the data"));
  }

  res.status(201).json({ message: "Deleted place" });
};
