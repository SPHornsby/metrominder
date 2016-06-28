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
      // var oldTime = item.stops[station];
      // var newTime = item.stops[station] + item.variance;
      // var today = new Date;
      // var datestring = today.toDateString();
      // var madeString = datestring + " 2:00:00";
      // var parsedDate = Date.parse(madeString);
      // var updated = new Date(parsedDate + 300000);
      // console.log(parsedDate);
      // console.log(parsedDate + 5000);
      // console.log(updated.toTimeString());
      var newTime = adjustTime(item.stops[station], item.variance);
      return {train: item.train, time: item.stops[station], variance: item.variance, newTime: newTime};
    } else {
      return {train: item.train, stops:item.stops, variance: item.variance};
    }

  });
  res.send(response);
});

var adjustTime = function(time, variance) {
  var today = new Date;
  var datestring = today.toDateString();
  var madeString = datestring + " " + time;
  var parsedDate = Date.parse(madeString);
  var updated = new Date(parsedDate + (variance*60000));
  return updated.toTimeString().slice(0,5);
};

module.exports = route;
