var train = require("express").Router();
var schedule = require("../data/schedule").data;
var querystring = require("querystring");
train.get("/", function(req, res) {
  console.log(req.query);
  var trainNumber = req.query.train;
  var station = req.query.station;
  var trainObject = schedule.filter(function(item) {

    return item.train == trainNumber;
  });
  console.log(trainObject[0].stops);
  var response = trainObject;
  if (station !== undefined) {

    response = trainObject[0].stops.filter((stop) => stop.name === station);
  }
  res.send([response]);
});


module.exports = train;
