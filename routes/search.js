var search = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");
var moment = require("moment");
search.get("/", function(req, res) {
  var route = req.query.route,
    station = req.query.station,
    trainNumber = req.query.train,
    timeCheck = req.query.train,
    trains = schedule;

  trains = trains.map((train) => {
    return train.stops.map((stop) => {
      return {train: train.train, route: train.route, status: time.convert(train.variance).minutes, station: stop.name, time: time.hasTime(stop.time), actualTime:time.hasTime(time.add(stop.time, train.variance))};
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
  if (timeCheck !== undefined) {
    trains = trains.filter(function(train) {
      var now = moment();
      var nowObject = now.toObject();
      var todayDate = `${nowObject.years}-${nowObject.months+1}-${nowObject.date}`;
      var arrivalTime = todayDate + " " + train.actualTime;
      return now.isBefore(arrivalTime);
    });
  }
  console.log(trains);
  res.send(trains);
});


module.exports = search;
