const apiKey = "AIzaSyA3k5JPBdg6gPEOEuhM2uSrnnC_pjZtE2w";
const axios = require("axios");
const HttpError = require("../server-models/HttpError/HttpError.model");
exports.getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("Could not find location for the address", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
};
