var search = require("express").Router();
var schedule = require("../data/schedule").data;
var time = require("../time.js");

search.get('/', function(req, res) {
  var route = req.query.route,
      station = req.query.station,
      trainNumber = req.query.train,
      trains = schedule,
      response;

      trains = trains.map((train) => {
          return train.stops.map((stop) => {
            return {train: train.train, route: train.route, status: train.variance, station: stop.name, time: time.hasTime(stop.time)};
        })
      }).reduce((a,b) => a.concat(b));

      if (route !== undefined) {
        console.log("route filter");
        trains = trains.filter(train => train.route === route );


        // trains = trains.filter((item) => item.route === route);
        // trains = trains.map((train) => {
        //     return train.stops.map((stop) => {
        //       return {train: train.train, route: train.route, status: train.variance, station: stop.name, time: time.hasTime(stop.time)};
        //   })
        // }).reduce((a,b) => a.concat(b));

      }
      if (trainNumber !== undefined) {
        console.log("train filter");

        trains = trains.filter(train => train.train.toString(10) === trainNumber);

        // trains = trains.filter((item) => item.train.toString(10) === train)[0].stops.map((stop) => {
        //   return {train: trains[0].train, route: trains[0].route, status:trains[0].variance, station: stop.name, time: time.hasTime(stop.time)};
        // });
        // trains = trains[0].stops.map((stop) => {
        //   return {train: trains[0].train, route: trains[0].route, status:trains[0].variance, station: stop.name, time: time.hasTime(stop.time)};
        // });
        //console.log(teststops);
      }
      if (station !== undefined) {
        console.log("station filter");

        trains = trains.filter(train => train.station === station);
        // trains = trains.map((item) => {
        //   var stops = item.stops;
        //   var stop = stops.filter((stop) => stop.name === station);
        //   return {train: item.train, route: item.route, station: stop[0].name, time: time.hasTime(stop[0].time), status: item.variance};
        // });
      }


      console.log(trains);

      res.send(trains);
});


module.exports = search;
