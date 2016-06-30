var train = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");
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
    //response = findTrainObject(schedule, station);
    console.log(response);
    response = trainObject[0].stops.filter((stop) => stop.name === station);
  } else {
    response = trainObject.map(function(item) {
      var results = [];

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
  }
  res.send(response);
});

// var findTrainObject = function(trains, station) {
//   var result = trains.map((train) => {
//     var stops = train.stops;
//     var stop = stops.filter((object) => {
//       return object.station === station;
//     });
//     console.log(`stop ${stop}`);
//     return {name: train.train, status: train.variance, station: stop[0].name, time: time.hasTime(stop[0].time)};
//   });
// };

module.exports = train;
