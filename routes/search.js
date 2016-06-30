var search = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");

search.get('/', function(req, res) {
  var route = req.query.route,
      station = req.query.station,
      train = req.query.train,
      trains = schedule,
      response;
      console.log(`Route: ${route} Station: ${station} Train: ${train}`);

      if (route !== undefined) {
        console.log("route filter");
        trains = trains.filter((item) => item.route === route);

      }
      if (train !== undefined) {
        console.log("train filter");
        trains = trains.filter((item) => item.train.toString(10) === train);
        trains = trains[0].stops.map((stop) => {
          return {train: trains[0].train, route: trains[0].route, status:trains[0].variance, station: stop.name, time: time.hasTime(stop.time)};
        });
        //console.log(teststops);
      }
      if (station !== undefined) {
        console.log("station filter");
        trains = trains.map((item) => {
          var stops = item.stops;
          var stop = stops.filter((stop) => stop.name === station);
          return {train: item.train, route: item.route, station: stop[0].name, time: time.hasTime(stop[0].time), status: item.variance};
        });
      }


      console.log(trains);

      res.send(trains);
});


module.exports = search;
