const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const placesRoutes = require("./server-routes/place-routes");
const userRoutes = require("./server-routes/user-routes");
const HttpError = require("./server-models/HttpError/HttpError.model");

const app = express();

app.use(bodyParser.json());
// add custom path here
// server.post('/request/custom', custom);

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://hihi123em:AzmGm52p1xniuSRH@cluster0.3ud5jrv.mongodb.net/place?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, (err) => {
      if (err) throw err;
      console.log("Ready on http://localhost:5000");
    });
  })
  .catch((e) => {
    throw e;
  });
