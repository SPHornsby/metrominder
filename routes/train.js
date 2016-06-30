var train = require("express").Router();
var schedule = require("../data/schedule").data;

train.get("/", function(req, res) {
  console.log(req.query);
  var route = req.query.route;
  var trains = schedule.filter(train => train.route === route).map(item => item.train);
  res.send(trains);
});

module.exports = train;
