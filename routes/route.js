var route = require("express").Router();
var schedule = require("../data/schedule").data;

route.get("/", function(req, res) {
  var route = req.query.route;
  var station = req.query.station;
  var trainObjects = schedule.filter(function(item) {
    return item.route == route;
  });
  var response = trainObjects.map(function(item) {
    if (station != undefined) {
      return {train: item.train, time: item.stops[station]};
    } else {
      return {train: item.train, stops:item.stops};
    }

  });
  res.send(response);
});

module.exports = route;
