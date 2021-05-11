const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const axios = require("axios");
require("dotenv").config();

// Define a port number in which the app needs to be started
const port = process.env.PORT || 3001;

// Use the logger package we have imported to get the log details of the app if needed.
app.use(logger("dev"));

// Enable Cross-Origin Resource Sharing
app.use(cors());

// To handle HTTP POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Functions

// Endpoints
app.post("/api/search", (req, res) => {
  let apiKey = process.env.OMDB_API_KEY;
  let apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&s=${req.body.search}`;
  axios
    .get(apiURL)
    .then((data) => {
      let returnData = data.data.Search;
      res.json(returnData);
      console.log("here we're sending json w/ the data");
    })
    .catch((err) => console.log("err", err));
});

app.listen(port, function () {
  console.log("Running on " + port);
});

// Error Handling
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
