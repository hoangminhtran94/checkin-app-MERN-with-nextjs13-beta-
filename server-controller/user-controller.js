const HttpError = require("../server-models/HttpError/HttpError.model");
const { validationResult } = require("express-validator");
const User = require("../server-models/User/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
  const { name, email, password } = req.body;

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("could not create user, please try again", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    places: [],
    image: req.file.path,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong when creating new account", 500)
    );
  }
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Could not login, please try again", 500));
  }

  res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }), token });
};

exports.login = async (req, res, next) => {
  const { email, password: loginPassword } = req.body;
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

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      loginPassword,
      existingUser.password
    );
  } catch (error) {
    return next(new HttpError("Could not login, please try again", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Password is incorrect, please try again", 422));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Could not login, please try again", 500));
  }

  const user = existingUser.toObject({ getters: true });
  const { password, ...returnUser } = user;
  res.json({ user: returnUser, token });
};
