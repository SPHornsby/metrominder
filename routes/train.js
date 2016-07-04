var train = require("express").Router();
var schedule = require("../data/schedule").data;

train.get("/", function(req, res) {
  var route = req.query.route,
    trains;
  if (route === "all") {
    trains = schedule.map(item => item.train);
  } else {
    trains = schedule.filter(train => train.route === route).map(item => item.train);
  }
  //var trains = schedule.filter(train => train.route === route).map(item => item.train);
  res.send(trains);
});
train.put("/:train/:delay", function(req, res) {
  var trainNumber= req.params.train;
  var delay = req.params.delay;
  var result = "Failed";
  var justNumbers = schedule.map(item => item.train);
  var index = justNumbers.indexOf(parseInt(trainNumber, 10));
  if (index !== -1) {
    schedule[index].variance = parseInt(delay, 10);
    result = schedule[index];
    res.send(result);
  } else {
    res.send(result);
  }

});

module.exports = train;
