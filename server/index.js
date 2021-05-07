const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

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
const handleSearchResults = (req, res) => {
  console.log(req.query.name);
};

// Endpoints
app.get("/api/SearchResults", handleSearchResults);

/*                                            */

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
