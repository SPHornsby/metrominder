var train = require("express").Router();
var schedule = require("../data/schedule").data;
var querystring = require('querystring');
train.get("/", function(req, res) {
  var trainNumber = req.query.train;
  var station = req.query.station;
  var trainObject = schedule.filter(function(item) {
    return item.train == trainNumber;
  });
  var response = trainObject[0].stops;
  if (station !== undefined) {
    response = trainObject[0].stops[station];
  }
  res.send(response);
});


module.exports = train;
