var maps = require("express").Router();
var locations = require("../data/locations.js").data;
var https = require("https");

maps.get("/station", function(req, res) {
  var query = req.query.station;
  var latLong = locations.filter( (location) => location.name === query);
  res.send(latLong);
});

maps.get("/", function(req, res) {
  var query=req.query;
  getDirections(query, function(data) {
    res.status(200).send(data);
  });
});

var getDirections = function(query, callback) {
  var origin = query.origin;
  var destination = query.destination;
  var key = process.env.GD_KEY;
  var querystring = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`;
  var finalData="";
  var smashedChunk="";
  var req = https.request(querystring, function(res) {
    res.on("data", function(chunk) {
      var textChunk = chunk.toString("utf8");
      finalData = finalData + textChunk;
      smashedChunk = smashedChunk + chunk;
    });
    res.on("end", function() {
      var result = JSON.parse(smashedChunk);
      if (result.status === "OK") {
        var importantData = result.routes[0].legs[0];
        var justSeconds = importantData.duration.value;
        var justMinutes = Math.floor(justSeconds/60);
        var returnObject = {distance: importantData.distance.text, duration: justMinutes};
      } else {
        returnObject = "SOMETHING";
      }
      callback(returnObject);
    });
  });
  req.end();
};
module.exports = maps;
