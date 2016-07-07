var search = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");
var moment = require("moment");
var _ = require("underscore");
search.get("/", function(req, res) {
  var route = req.query.route,
    station = req.query.station,
    trainNumber = req.query.train,
    timeCheck = true,
    trains = schedule;

  trains = trains.map((train) => {
    return train.stops.map((stop) => {
      return {train: train.train, route: train.route, status: time.convert(train.variance).minutes, station: stop.name, time: time.hasTime(stop.time), actualTime:time.hasTime(time.add(stop.time, train.variance))};
    });
  }).reduce((a,b) => a.concat(b));

  if (timeCheck) {
    trains = trains.filter(function(train) {
      var now = moment();
      var nowObject = now.toObject();
      var todayMonth = (nowObject.months+1).toString(10);
      if (todayMonth.length === 1) {
        todayMonth = "0" + todayMonth;
      }
      var todayDay = (nowObject.date).toString(10);
      if (todayDay.length === 1) {
        todayDay = "0" + todayDay;
      }
      var todayDate = `${nowObject.years}-${todayMonth}-${todayDay}`;
      var arrivalTime = todayDate + " " + train.actualTime;
      return now.isBefore(arrivalTime);
    });

  }
  if (route !== undefined) {
    if (route === "None") {
      var trainNumbers = _.map(trains, function(item) {
        return item.train;
      });
      var uniqueTrains = _.uniq(trainNumbers);
      trains = _.map(uniqueTrains, function(item) {
        return {train: item};
      })
    } else {
      trains = trains.filter(train => train.route === route );
    }

  }

  if (station !== undefined) {
    trains = trains.filter(train => train.station === station);

  }

  if (trainNumber !== undefined) {

    if (trainNumber === "None") {
      var stations = _.map(trains, function (item) {
        return item.station;
      });
      var uniqueStations = _.uniq(stations);
      trains = _.map(uniqueStations, function(item) {
        return {station: item};
      });

    } else {

      trains = trains.filter(train => {

        return train.train == trainNumber;
      });

    }

  }
  res.send(trains);
});


module.exports = search;
