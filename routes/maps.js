var maps = require("express").Router();
var locations = require("../data/locations.js").data;
var env = require('../ENV.js').keys[0];
const https = require('https');

maps.get("/station", function(req, res) {
  var query = req.query.station;
  var latLong = locations.filter( (location) => location.name === query);
  console.log(latLong);
  res.send(latLong);
})

maps.get("/", function(req, res) {
  var query=req.query;
  var data = getDirections(query, function(data) {
    res.status(200).send(data);
  });
});



var getDirections = function(query, callback) {
  var origin = query.origin;
  var destination = query.destination;
  var key = env.directions;
  console.log("Getting");
  var querystring = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`;
  var finalData="";
  var smashedChunk="";
  var req = https.request(querystring, function (res) {
    //console.log(res);
    res.on("data", function(chunk) {
      var textChunk = chunk.toString('utf8');
      finalData = finalData + textChunk;
      smashedChunk = smashedChunk + chunk;
      //console.log(textChunk);
    });
    res.on("end", function() {
      //callback(finalData);
      var result = JSON.parse(smashedChunk);
      var importantData = result.routes[0].legs[0];
      var returnObject = {distance: importantData.distance.text, duration: importantData.duration.text};
      callback(returnObject);
    });
  });
  req.end();
}



module.exports = maps;
