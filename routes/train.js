var train = require("express").Router();
var schedule = require("../data/schedule").data;

train.get("/", function(req, res) {
  var route = req.query.route,
    trains;
  if (route === "all") {
    trains = schedule.map(item => item.train);
  } else {
    trains = schedule.filter(train => train.route === route).map(item => item.train);
  }
  //var trains = schedule.filter(train => train.route === route).map(item => item.train);
  res.send(trains);
});

module.exports = train;
