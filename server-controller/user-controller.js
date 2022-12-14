const uuid = require("uuid");
const HttpError = require("../server-models/HttpError/HttpError.model");
const { validationResult } = require("express-validator");
const User = require("../server-models/User/User.model");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res
      .json({ users: users.map((user) => user.toObject({ getters: true })) })
      .status(201);
  } catch (error) {
    return next(new HttpError("Fetching failed"), 500);
  }
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data!", 422));
  }
  const { name, email, password, places, image } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Something went wrong, when checking email", 500)
    );
  }
  if (existingUser) {
    return next(
      new HttpError("Email already registered, please try another email", 422)
    );
  }

  const createdUser = new User({ name, email, password, places, image });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong when creating new account", 500)
    );
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Something went wrong, when checking email", 500)
    );
  }
  if (!existingUser) {
    return next(new HttpError("Email did not exist, please try again", 422));
  }
  if (existingUser.password !== password) {
    return next(new HttpError("Password is incorrect, please try again", 422));
  }

  res.json({ message: "Logged in" });
};
