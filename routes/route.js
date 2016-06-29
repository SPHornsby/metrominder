var route = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");

route.get("/", function(req, res) {
  var route = req.query.route;
  var station = req.query.station;
  var trainObjects = schedule.filter(function(item) {
    return item.route == route;
  });
  //TODO add station check here and then filter for that station.
  if (station !== undefined) {
    //console.log(trainObjects);
    var newTrains = trainObjects.map(function(item){
      item.stops.filter(function(stop) {
        if (stop.name === station) {
          console.log("Match");
          return stop;
        }
      });
    });
  }
  var response = trainObjects.map(function(item) {
    var results = [];
    console.log(" stop length {$item.stops.length}");
    for (var i = 0; i < item.stops.length; i++) {
      var itemTime = item.stops[i].time;
      var timeString = time.hasTime(itemTime);
      var status;
      if (item.variance > 0) {
        status = "Late";
      } else {
        status = "On-Time";
      }
      var object = {train: item.train, name: item.stops[i].name, time: timeString, status: status};
      results.push(object);
    }
    return results;

  });
  //results or response?
  console.log(response.length);
  res.send(response);
});
route.get("/all", function(req, res) {

  var sortedSchedule = schedule.map(function(item) {
    var train = item.train,
      name = item.stops[0].name,
      nextTime = time.hasTime(item.stops[0].time),
      status = "TEST";
    if (item.variance > 0) {
      status = "Late";
    } else {
      status = "On-Time";
    }
    return {train: train, name: name, time: nextTime, status: status};
  });
  res.send(sortedSchedule);
});
// var adjustTime = function(time, variance) {
//   var today = new Date;
//   var datestring = today.toDateString();
//   var madeString = datestring + " " + time;
//   var parsedDate = Date.parse(madeString);
//   var updated = new Date(parsedDate + (variance*60000));
//   return updated.toTimeString().slice(0,5);
// };
module.exports = route;
