var search = require("express").Router();

var _ = require("underscore");

search.get("/", function(req, res) {
  var route = req.query.route;
  var station = req.query.station;
  var trainNumber = req.query.train;

  var trains = req.trains;


  if (route !== undefined) {
    if (route === "All") {
      var trainNumbers = _.map(trains, function(item) {
        return item.train;
      });
      var uniqueTrains = _.uniq(trainNumbers);
      trains = _.map(uniqueTrains, function(item) {
        return {train: item};
      });
    } else {
      trains = trains.filter(train => train.route === route );
    }
  }
  if (station !== undefined) {
    trains = trains.filter(train => train.station === station);
  }
  if (trainNumber !== undefined) {
    if (trainNumber === "All") {
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
