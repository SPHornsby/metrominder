var schedule = require("../data/schedule").data;
var moment = require("moment-timezone");

var preScreen = function (req, res, next) {
  req.trains = schedule.map((train) => {
    return train.stops.map((stop) => {
      var momentTime = moment.tz(stop.time, "America/Los_Angeles");
      return {train: train.train, route: train.route, status: train.variance/60000, station: stop.name, time: momentTime, actualTime:momentTime.add(train.variance, "ms")};
    });
  }).reduce((a,b) => a.concat(b))
  .filter(function(train) {
    var now = moment().tz("America/Los_Angeles");
    var arrivalTime = train.actualTime;
    return now.isBefore(arrivalTime);
  });

  next();
}
module.exports = preScreen;
