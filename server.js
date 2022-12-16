const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const placesRoutes = require("./server-routes/place-routes");
const userRoutes = require("./server-routes/user-routes");
const HttpError = require("./server-models/HttpError/HttpError.model");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
// add custom path here
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      console.log(error);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(5000, (err) => {
      if (err) throw err;
      console.log("Ready on http://localhost:5000");
    });
  })
  .catch((e) => {
    throw e;
  });
