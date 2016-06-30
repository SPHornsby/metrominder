var search = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");

search.get("/", function(req, res) {
  var route = req.query.route,
    station = req.query.station,
    trainNumber = req.query.train,
    trains = schedule;

  trains = trains.map((train) => {
    return train.stops.map((stop) => {
      return {train: train.train, route: train.route, status: time.convert(train.variance).minutes, station: stop.name, time: time.hasTime(stop.time)};
    });
  }).reduce((a,b) => a.concat(b));
  if (route !== undefined) {
    trains = trains.filter(train => train.route === route );
  }
  if (trainNumber !== undefined) {
    trains = trains.filter(train => train.train.toString(10) === trainNumber);

  }
  if (station !== undefined) {
    trains = trains.filter(train => train.station === station);

  }
  res.send(trains);
});


module.exports = search;
