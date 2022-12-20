const HttpError = require("../server-models/HttpError/HttpError.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("UnAuthorized, please login first", 403);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed, please try agin", 500));
  }
};
