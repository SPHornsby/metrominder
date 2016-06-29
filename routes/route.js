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
    console.log("something");
    //console.log(trainObjects);
    var newTrains = trainObjects.map(function(item){
      console.log(item);
      item.stops.filter(function(stop) {
        if (stop.name === station) {
          console.log("Match");
          return stop;
        }
      });
    });
    console.log("done");
  }
  console.log(trainObjects);
  var response = trainObjects.map(function(item) {
    // if (item.variance > 0) {
    //   console.log(`Train is running ${item.variance} milliseconds late`);
    // }
    //console.log(station);
    // if (station != undefined) {
    //   console.log(item.stops[station]);
    //   var time = `${item.stops[station].time.hours}:${item.stops[station].time.minutes}`;
    //   console.log(time);
    //   return {train: item.train, station: station, time: item.stops[station], variance: item.variance};
    // } else {
    var results = [];
    console.log(" stop length {$item.stops.length}");
    for (var i = 0; i < item.stops.length; i++) {
      var time;
      if (typeof item.stops[i].time === "object") {
        var stop = item.stops[i];
        var seconds = stop.time.minutes.toString(10);
        console.log(`seconds length ${seconds.length}`);
        if (seconds.length===1) {

          seconds = "0" + seconds;
        }
        time = `${stop.time.hours}:${seconds}`;
      } else {
        time = "No Stop";
      }


      var status;
      if (item.variance > 0) {
        status = "Late";
      } else {
        status = "On-Time";
      }
      var object = {train: item.train, name: item.stops[i].name, time: time, status: status};
      results.push(object);
    }
    return results;
  //  }

  });
  res.send(response);
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
