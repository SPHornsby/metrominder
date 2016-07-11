var schedule = require("../data/schedule").data;
var moment = require("moment-timezone");

var preScreen = function (req, res, next) {
  req.trains = schedule.map((train) => {
    return train.stops.map((stop) => {
      var momentTime = moment(stop.time).utcOffset(-7);
      return {train: train.train, route: train.route, status: train.variance/60000, station: stop.name, time: stop.time, actualTime:momentTime.add(train.variance, "ms")};
    });
  }).reduce((a,b) => a.concat(b))
  .filter(function(train) {
    var now = moment.tz();
    var adjusted = now.tz("America/Los_Angeles");
    var arrivalTime = train.actualTime;
    return now.isBefore(arrivalTime);
  });

  next();
}
module.exports = preScreen;
