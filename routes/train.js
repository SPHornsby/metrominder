var train = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");

train.get("/", function(req, res) {
  console.log(req.query);
  var route = req.query.route;
  var trains = schedule.filter(train => train.route === route).map(item => item.train);
  res.send(trains);
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
